import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';

import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { AddItemDto } from './dto/add-item.dto';
import { Auth } from 'src/auth/decorators';

@Auth()
@Controller('shopping-list')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Post()
  async createShoppingList(
    @Body() createShoppingListDto: CreateShoppingListDto,
  ) {
    return this.shoppingListService.createShoppingList(createShoppingListDto);
  }

  @Get()
  async getShoppingLists() {
    return this.shoppingListService.getShoppingLists();
  }

  @Post(':shoppingListId/item')
  async addItemToList(
    @Param('shoppingListId') shoppingListId: string,
    @Body() addItemDto: AddItemDto,
  ) {
    return this.shoppingListService.addItemToList(shoppingListId, addItemDto);
  }

  @Delete(':shoppingListId')
  async deleteShoppingList(@Param('shoppingListId') shoppingListId: string) {
    return this.shoppingListService.deleteShoppingList(shoppingListId);
  }

  @Delete('item/:itemId')
  async removeItemFromList(@Param('itemId') itemId: string) {
    return this.shoppingListService.removeItemFromList(itemId);
  }
}
