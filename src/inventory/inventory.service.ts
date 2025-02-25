import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './dtos/create-inventory.dto';
import { JoinInventoryDto } from './dtos/join-inventory.dto';

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
}
