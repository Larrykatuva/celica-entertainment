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
import { Event } from './event.entity';
import { User } from '../../authentication/entities/user.entity';

@Entity()
export class Attendee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @ManyToOne(() => Event, (event) => event.id)
  @JoinColumn()
  event: Event;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  referenceCode: string;

  @Column({ default: false })
  hasExpired: boolean;

  @Column({ type: 'datetime' })
  arrivalTime: Date;

  @Column({ default: false })
  isRefunded: boolean;

  @Column({ default: false })
  isCancelled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
