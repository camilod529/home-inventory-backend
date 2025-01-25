import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Inventory } from './inventory.entity';
import { ShoppingListProduct } from './shoppingListProduct.entity';

@Entity('shopping_lists')
export class ShoppingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Inventory, (inventory) => inventory.shopping_lists)
  inventory: Inventory;

  @Column('text')
  name: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(
    () => ShoppingListProduct,
    (shoppingListProduct) => shoppingListProduct.shopping_list,
  )
  shopping_list_products: ShoppingListProduct[];
}
