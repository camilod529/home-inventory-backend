import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Inventory } from './inventory.entity';
import { Category } from './category.entity';
import { ModificationHistory } from './modificationHistory.entity';
import { ShoppingListProduct } from './shoppingListProduct.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => Inventory, (inventory) => inventory.products)
  inventory: Inventory;

  @Column('int', { default: 0 })
  current_quantity: number;

  @Column('int', { default: 0 })
  minimum_quantity: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(
    () => ModificationHistory,
    (modificationHistory) => modificationHistory.product,
  )
  modification_histories: ModificationHistory[];

  @OneToMany(
    () => ShoppingListProduct,
    (shoppingListProduct) => shoppingListProduct.product,
  )
  shopping_list_products: ShoppingListProduct[];
}
