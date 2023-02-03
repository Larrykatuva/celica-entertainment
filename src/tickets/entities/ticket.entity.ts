import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';

export enum TicketCategory {
  VVIP = 'VVIP',
  VIP = 'VIP',
  REGULAR = 'REGULAR',
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  startSaleDate: Date;

  @Column()
  endSaleDate: Date;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: TicketCategory })
  category: TicketCategory;

  @ManyToOne(() => Event, (event) => event.tickets)
  @JoinColumn()
  event: Event;

  @Column()
  orders: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
