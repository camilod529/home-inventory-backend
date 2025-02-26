import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingList } from './entities/shopping-list.entity';
import { ShoppingListItem } from './entities/shopping-list-item.entity';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { PassportModule } from '@nestjs/passport';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingList, ShoppingListItem, Inventory]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ShoppingListController],
  providers: [ShoppingListService],
})
export class ShoppingListModule {}
