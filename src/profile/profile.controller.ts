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
import { FindOneParams } from '@src/profile/dto/find-one.params';

@UseGuards(LoggedInGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  public create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  public findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  public findOne(@Param() { id }: FindOneParams) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  public update(
    @Param() { id }: FindOneParams,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  public remove(@Param() { id }: FindOneParams) {
    return this.profileService.remove(+id);
  }
}
