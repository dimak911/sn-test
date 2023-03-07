import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('sn_profile')
export class Profile {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'avatar' })
  avatar: string;

  @Column({ name: 'description' })
  description: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: User;
}
