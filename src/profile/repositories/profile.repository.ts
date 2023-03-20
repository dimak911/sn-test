import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Profile } from '@src/profile/entities/profile.entity';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { isNil } from 'lodash';

@EntityRepository()
export class ProfileRepository extends Repository<Profile> {
  constructor(protected readonly dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  public async changeOrSaveAvatar(
    newAvatar: PublicFile,
    profile: Profile
  ): Promise<Profile> {
    const updatedProfile = { ...profile, avatar: newAvatar };

    await this.manager.transaction(async (transactionManager) => {
      if (!isNil(profile.avatar)) {
        await transactionManager
          .getRepository(Profile)
          .update(profile.id, { avatar: null });

        await transactionManager
          .getRepository(PublicFile)
          .delete({ id: profile.avatar.id });
      }

      await transactionManager
        .getRepository(PublicFile)
        .save({ ...newAvatar, profile: profile });
    });

    return updatedProfile;
  }
}
