import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShoppingListItem } from './shopping-list-item.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Entity()
export class ShoppingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Inventory, (inventory) => inventory.shoppingLists, {
    onDelete: 'CASCADE',
  })
  inventory: Inventory;

  @OneToMany(() => ShoppingListItem, (item) => item.shoppingList, {
    cascade: true,
  })
  items: ShoppingListItem[];
}
