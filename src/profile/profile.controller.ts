import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { LoggedInGuard } from '@src/auth/guards/logged-in.guard';
import { IdParams } from '@src/common/dto/id.params';
import { Profile } from '@src/profile/entities/profile.entity';

@UseGuards(LoggedInGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  public create(
    @Body() createProfileDto: CreateProfileDto
  ): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  public findAll(): Promise<string> {
    return this.profileService.findAll();
  }

  @Get(':id')
  public findOne(@Param() { id }: IdParams): Promise<string> {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  public update(
    @Param() { id }: IdParams,
    @Body() updateProfileDto: UpdateProfileDto
  ): Promise<string> {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  public remove(@Param() { id }: IdParams): Promise<string> {
    return this.profileService.remove(+id);
  }
}
