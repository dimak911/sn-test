import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Session,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from '@src/profile/profile.service';
import { UpdateProfileDto } from '@src/profile/dto/update-profile.dto';
import { LoggedInGuard } from '@src/auth/guards/logged-in.guard';
import { IdParams } from '@src/common/dto/id.params';
import { ProfileResponseDto } from '@src/profile/dto/profile-response.dto';

@UseGuards(LoggedInGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  public findOneById(
    @Param()
    { id }: IdParams
  ): Promise<ProfileResponseDto> {
    return this.profileService.findOneById(id);
  }

  @Get()
  public findOne(
    @Session() session: Record<string, any>
  ): Promise<ProfileResponseDto> {
    return this.profileService.findOneAndMap(
      session.passport.user.id
    );
  }

  @Patch()
  public update(
    @Body() updateProfileDto: UpdateProfileDto,
    @Session() session: Record<string, any>
  ): Promise<ProfileResponseDto> {
    return this.profileService.update(
      session.passport.user.id,
      updateProfileDto
    );
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  public async updateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Session() session: Record<string, any>
  ): Promise<ProfileResponseDto> {
    return await this.profileService.updateAvatar(
      file,
      session.passport.user.id
    );
  }
}
