import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import { User } from '@src/user/entities/user.entity';

@Entity('sn_profile')
export class Profile extends BaseEntity {
  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToOne(() => User, ({ profile }) => profile)
  user: User;
}
