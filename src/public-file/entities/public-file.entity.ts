import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Profile } from '@src/profile/entities/profile.entity';

@Entity('sn_public_file')
export class PublicFile extends BaseEntity {
  @Column({ name: 'url', nullable: true })
  url: string;

  @Column({ name: 'type', nullable: true })
  type: 'video' | 'image';

  @Column({ name: 'key', nullable: true })
  key: string;

  @OneToOne(() => Profile, ({ avatar }) => avatar)
  profile?: Profile;
}
