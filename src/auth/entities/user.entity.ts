import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Inventory } from '../../inventory/entities/inventory.entity';
import { ModificationHistory } from '../../inventory/entities/modificationHistory.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @Column('bool', {
    default: false,
  })
  deleted: boolean;

  @OneToMany(() => Inventory, (inventory) => inventory.created_by)
  created_inventories: Inventory[];

  @OneToMany(
    () => ModificationHistory,
    (modificationHistory) => modificationHistory.user,
  )
  modification_histories: ModificationHistory[];

  @ManyToMany(() => Inventory, (inventory) => inventory.users)
  @JoinTable() // <-- Only on one side
  inventories: Inventory[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  emailToLowerCaseOnUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
