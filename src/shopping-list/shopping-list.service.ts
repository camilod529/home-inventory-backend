import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingList } from './entities/shopping-list.entity';
import { ShoppingListItem } from './entities/shopping-list-item.entity';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { AddItemDto } from './dto/add-item.dto';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ShoppingList)
    private shoppingListRepository: Repository<ShoppingList>,

    @InjectRepository(ShoppingListItem)
    private shoppingListItemRepository: Repository<ShoppingListItem>,

    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async createShoppingList(dto: CreateShoppingListDto): Promise<ShoppingList> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: dto.inventoryId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    const shoppingList = this.shoppingListRepository.create({
      name: dto.name,
      inventory,
    });

    return this.shoppingListRepository.save(shoppingList);
  }

  async getShoppingLists(): Promise<ShoppingList[]> {
    return this.shoppingListRepository.find({ relations: ['items'] });
  }

  async addItemToList(
    shoppingListId: string,
    addItemDto: AddItemDto,
  ): Promise<ShoppingListItem> {
    const shoppingList = await this.shoppingListRepository.findOne({
      where: { id: shoppingListId },
      relations: ['items'],
    });

    if (!shoppingList) throw new NotFoundException('Shopping list not found');

    const item = this.shoppingListItemRepository.create({
      ...addItemDto,
      shoppingList,
    });
    return this.shoppingListItemRepository.save(item);
  }

  async deleteShoppingList(shoppingListId: string): Promise<void> {
    await this.shoppingListRepository.delete(shoppingListId);
  }

  async removeItemFromList(itemId: string): Promise<void> {
    const item = await this.shoppingListItemRepository.findOne({
      where: { id: itemId },
    });

    if (!item) throw new NotFoundException('Item not found');

    await this.shoppingListItemRepository.delete(itemId);
  }
}
