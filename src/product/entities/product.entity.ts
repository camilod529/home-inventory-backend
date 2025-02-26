import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int')
  quantity: number;

  @Column()
  unit: string; // kg, L, unidades, etc.

  @Column({ type: 'date', nullable: true })
  expirationDate?: Date;

  @ManyToOne(() => Inventory, (inventory) => inventory.products, {
    onDelete: 'CASCADE',
  })
  inventory: Inventory;
}
