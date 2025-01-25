import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Inventory } from './entities/inventory.entity';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { ModificationHistory } from './entities/modificationHistory.entity';
import { ShoppingList } from './entities/shoppingList.entity';
import { ShoppingListProduct } from './entities/shoppingListProduct.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inventory,
      Product,
      Category,
      ModificationHistory,
      ShoppingList,
      ShoppingListProduct,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [InventoryService, ProductService],
  controllers: [InventoryController, ProductController],
})
export class InventoryModule {}
