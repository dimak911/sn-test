import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '@src/profile/entities/profile.entity';
import { ProfileResponseDto } from '@src/profile/dto/profile-response.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
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

  public async findOne(userId: number): Promise<ProfileResponseDto> {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!profile)
      throw new BadRequestException(`No profile with id: ${userId}`);

    return this.mapProfileToProfileResponseDto(profile);
  }

  public async update(
    id: number,
    updateProfileDto: UpdateProfileDto
  ): Promise<ProfileResponseDto> {
    const profile = await this.findOne(id);

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
    response.avatar = profile.avatar;
    response.description = profile.description;

    return response;
  }
}
