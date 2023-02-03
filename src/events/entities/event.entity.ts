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
import { Organizer } from '../../organizer/entities/organizer.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Organizer, (organizer) => organizer.id)
  @JoinColumn()
  organizer: Organizer;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];

  @Column()
  eventImage: string;

  @Column()
  eventVideo: string;

  @Column()
  location: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
