import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from '@src/profile/entities/profile.entity';
import { ProfileResponseDto } from '@src/profile/dto/profile-response.dto';
import { PublicFileService } from '@src/public-file/public-file.service';
import { ProfileRepository } from '@src/profile/repositories/profile.repository';
import { MinioClientService } from '@src/minio-client/minio-client.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly publicFileService: PublicFileService,
    private readonly minioClientService: MinioClientService
  ) {}

  public async create(
    createProfileDto: CreateProfileDto
  ): Promise<Profile> {
    const profile = this.profileRepository.create(createProfileDto);

    return await this.profileRepository.save(profile);
  }

  public async findOneById(
    profileId: number
  ): Promise<ProfileResponseDto> {
    const foundProfile = await this.profileRepository.findOne({
      where: { id: profileId },
    });

    if (!foundProfile)
      throw new BadRequestException(
        `No profile with id: ${profileId}`
      );

    return this.mapProfileToProfileResponseDto(foundProfile);
  }

  public async findOne(userId: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
      join: {
        leftJoinAndSelect: {
          avatar: 'profile.avatar',
        },
        alias: 'profile',
      },
    });

    if (!profile)
      throw new BadRequestException(`No profile with id: ${userId}`);

    return profile;
  }

  public async findOneAndMap(
    userId: number
  ): Promise<ProfileResponseDto> {
    const profile = await this.findOne(userId);

    return this.mapProfileToProfileResponseDto(profile);
  }

  public async update(
    id: number,
    updateProfileDto: UpdateProfileDto
  ): Promise<ProfileResponseDto> {
    const profile = await this.findOneAndMap(id);

    const updatedProfile = await this.profileRepository.save({
      ...profile,
      ...updateProfileDto,
    });

    return this.mapProfileToProfileResponseDto(updatedProfile);
  }

  private mapProfileToProfileResponseDto(
    profile: Profile
  ): ProfileResponseDto {
    const response = new ProfileResponseDto();

    response.id = profile.id;
    response.firstName = profile.firstName;
    response.lastName = profile.lastName;
    response.avatar = profile.avatar
      ? this.publicFileService.mapPublicFileToPublicFileResponseDto(
          profile.avatar
        )
      : null;
    response.description = profile.description;

    return response;
  }

  public async updateAvatar(
    file: Express.Multer.File,
    userId: number
  ): Promise<ProfileResponseDto> {
    const profile = await this.findOne(userId);

    const oldAvatar = await this.publicFileService.findOne(
      profile.avatar?.id
    );

    const avatar = await this.publicFileService.createAvatarFile(
      file
    );

    const resProfile =
      await this.profileRepository.changeOrSaveAvatar(
        avatar,
        profile
      );

    await this.minioClientService.deleteFile(oldAvatar?.key);

    return this.mapProfileToProfileResponseDto(resProfile);
  }
}
