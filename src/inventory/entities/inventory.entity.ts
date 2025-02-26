import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { nanoid } from 'nanoid';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => User, (user) => user.ownedInventories, {
    onDelete: 'CASCADE',
  })
  owner: User; // Propietario del inventario

  @ManyToMany(() => User, (user) => user.inventories)
  @JoinTable()
  members: User[]; // Usuarios con acceso al inventario

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date; // Para soft delete

  @OneToMany(() => Product, (product) => product.inventory, { cascade: true })
  products: Product[];

  @BeforeInsert()
  generateCode() {
    this.code = nanoid(10); // Genera un código único de 10 caracteres
  }
}
