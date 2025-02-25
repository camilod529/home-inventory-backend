import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import {
  CreateInventoryDto,
  JoinInventoryDto,
  TransferInventoryDto,
  UpdateInventoryDto,
} from './dtos';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createInventory(
    createInventoryDto: CreateInventoryDto,
    owner: User,
  ): Promise<Inventory> {
    const inventory = this.inventoryRepository.create({
      ...createInventoryDto,
      owner,
      members: [owner],
    });

    return this.inventoryRepository.save(inventory);
  }

  async getUserInventories(user: User): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: [
        {
          owner: user,
        },
        {
          members: user,
        },
      ],
      relations: ['owner', 'members'],
    });
  }

  async getInventoryById(id: string, user: User) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: ['owner', 'members'],
    });

    if (!inventory) throw new NotFoundException('Inventory not found');

    const isMember = inventory.members.some((member) => member.id === user.id);
    if (!isMember && inventory.owner.id !== user.id)
      throw new ForbiddenException('You do not have access to this inventory');

    return inventory;
  }

  async joinInventory(joinInventoryDto: JoinInventoryDto, user: User) {
    const { code } = joinInventoryDto;

    const inventory = await this.inventoryRepository.findOne({
      where: { code },
      relations: ['members'],
    });

    if (!inventory) throw new NotFoundException('Inventory not found');

    if (inventory.members.some((member) => member.id === user.id))
      throw new ForbiddenException(
        'You are already a member of this inventory',
      );

    inventory.members.push(user);

    await this.inventoryRepository.save(inventory);

    return inventory;
  }

  async updateInventory(
    id: string,
    updateInventoryDto: UpdateInventoryDto,
    user: User,
  ) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!inventory) throw new NotFoundException('Inventory not found');

    if (inventory.owner.id !== user.id)
      throw new ForbiddenException('You are not the owner of this inventory');

    Object.assign(inventory, updateInventoryDto);

    return this.inventoryRepository.save(inventory);
  }

  async transferOwnership(
    id: string,
    transferInventoryDto: TransferInventoryDto,
    user: User,
  ) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: ['owner', 'members'],
    });

    if (!inventory) throw new NotFoundException('Inventory not found');

    if (inventory.owner.id !== user.id)
      throw new ForbiddenException('Only the owner can transfer ownership');

    const newOwner = await this.userRepository.findOne({
      where: { id: transferInventoryDto.newOwnerId },
    });

    if (
      !newOwner ||
      !inventory.members.some((member) => member.id === newOwner.id)
    )
      throw new NotFoundException(
        'New owner must be a member of the inventory',
      );

    inventory.owner = newOwner;

    return this.inventoryRepository.save(inventory);
  }

  async deleteInventory(id: string, user: User) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!inventory) throw new NotFoundException('Inventory not found');

    if (inventory.owner.id !== user.id)
      throw new ForbiddenException('You are not the owner of this inventory');

    await this.inventoryRepository.softRemove(inventory);
  }

  async removeMember(inventoryId: string, memberId: string, owner: User) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
      relations: ['owner', 'members'],
    });

    if (!inventory) throw new NotFoundException('Inventory not found');

    if (inventory.owner.id !== owner.id)
      throw new ForbiddenException('You are not the owner of this inventory');

    const memberIndex = inventory.members.findIndex(
      (member) => member.id === memberId,
    );

    if (memberIndex === -1)
      throw new NotFoundException('Member not found in this inventory');

    inventory.members.splice(memberIndex, 1);

    await this.inventoryRepository.save(inventory);

    return { message: 'Member removed successfully' };
  }

  async leaveInventory(inventoryId: string, user: User) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
      relations: ['owner', 'members'],
    });

    if (!inventory) throw new NotFoundException('Inventory not found');

    if (inventory.owner.id === user.id)
      throw new ForbiddenException('The owner cannot leave the inventory');

    const memberIndex = inventory.members.findIndex(
      (member) => member.id === user.id,
    );

    if (memberIndex === -1)
      throw new NotFoundException('You are not a member of this inventory');

    inventory.members.splice(memberIndex, 1);

    await this.inventoryRepository.save(inventory);

    return { message: 'You have left the inventory' };
  }
}
