import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { User } from '../../auth/entities/user.entity';

@Entity('modification_histories')
export class ModificationHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.modification_histories)
  product: Product;

  @ManyToOne(() => User, (user) => user.modification_histories)
  user: User;

  @Column('text')
  action: string;

  @Column('int', { nullable: true })
  quantity: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  modified_at: Date;
}
