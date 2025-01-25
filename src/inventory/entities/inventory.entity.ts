import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Product } from './product.entity';
import { ShoppingList } from './shoppingList.entity';

@Entity('inventories')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  unique_code: string;

  @Column('text', { nullable: true })
  optional_password: string;

  @ManyToOne(() => User, (user) => user.created_inventories)
  created_by: User;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToMany(() => User, (user) => user.created_inventories)
  users: User[];

  @OneToMany(() => Product, (product) => product.inventory)
  products: Product[];

  @OneToMany(() => ShoppingList, (shoppingList) => shoppingList.inventory)
  shopping_lists: ShoppingList[];
}
