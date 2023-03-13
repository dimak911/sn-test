import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '@src/profile/entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  public async create(createProfileDto: CreateProfileDto) {
    const profile = this.profileRepository.create(createProfileDto);

    return await this.profileRepository.save(profile);
  }

  public async findAll() {
    return `This action returns all profile`;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  public async update(
    id: number,
    updateProfileDto: UpdateProfileDto
  ) {
    return `This action updates a #${id} profile`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
