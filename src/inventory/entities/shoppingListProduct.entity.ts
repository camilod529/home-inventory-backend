import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Product } from './product.entity';
import { ShoppingList } from './shoppingList.entity';

@Entity('shopping_list_products')
export class ShoppingListProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => ShoppingList,
    (shoppingList) => shoppingList.shopping_list_products,
  )
  shopping_list: ShoppingList;

  @ManyToOne(() => Product, (product) => product.shopping_list_products)
  product: Product;

  @Column('int')
  quantity: number;
}
