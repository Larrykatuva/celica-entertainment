import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../authentication/entities/user.entity';
import { OrderStatus } from './orderStatus.entity';
import { Event } from '../../events/entities/event.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @OneToMany(() => OrderStatus, (orderStatus) => orderStatus.order)
  orderStatuses: OrderStatus[];

  @Column()
  amount: number;

  @OneToOne(() => Event, (event) => event.id)
  @JoinColumn()
  event: Event;

  @Column()
  taxAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
