import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import { User } from '@src/user/entities/user.entity';
import { PublicFile } from '@src/public-file/entities/public-file.entity';

@Entity('sn_profile')
export class Profile extends BaseEntity {
  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToOne(() => User, ({ profile }) => profile)
  user: User;

  @OneToOne(() => PublicFile, { nullable: true })
  @JoinColumn({ name: 'avatar_id', referencedColumnName: 'id' })
  avatar?: PublicFile;
}
