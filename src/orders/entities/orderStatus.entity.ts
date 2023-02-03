import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../authentication/entities/user.entity';
import { Order } from './order.entity';

export enum OrderStats {
  PAID = 'PAID',
  USED = 'USED',
  CANCELLED = 'CANCELLED',
  REVOKED = 'REVOKED',
}

@Entity()
export class OrderStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: OrderStats })
  status: OrderStats;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  doneBy: User;

  @ManyToOne(() => Order, (order) => order.orderStatuses)
  @JoinColumn()
  order: Order;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
