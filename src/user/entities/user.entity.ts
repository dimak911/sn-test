import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from '@src/profile/entities/profile.entity';
import { BaseEntity } from '@src/common/entities/base.entity';

@Entity('sn_user')
export class User extends BaseEntity {
  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @OneToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
