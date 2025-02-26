import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ShoppingList } from './shopping-list.entity';

@Entity()
export class ShoppingListItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Nombre del producto

  @Column({ nullable: true })
  quantity?: number; // Cantidad opcional

  @Column({ nullable: true })
  unit?: string; // Unidad opcional (kg, L, etc.)

  @ManyToOne(() => ShoppingList, (shoppingList) => shoppingList.items)
  shoppingList: ShoppingList;
}
