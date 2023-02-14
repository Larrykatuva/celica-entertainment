import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from '../../settings/entities/country.entity';
import { User } from '../../authentication/entities/user.entity';

@Entity()
export class Organizer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  logo: string;

  @OneToOne(() => Country, (country) => country.id)
  @JoinColumn()
  country: Country;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  owner: User;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isKyc: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @Column()
  city: string;

  @Column()
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
