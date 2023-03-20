import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PublicFileService } from './public-file.service';
import { UpdatePublicFileDto } from './dto/update-public-file.dto';
import { PublicFile } from '@src/public-file/entities/public-file.entity';

@Controller('public-file')
export class PublicFileController {
  constructor(
    private readonly publicFileService: PublicFileService
  ) {}

  @Get()
  public findAll(): string {
    return this.publicFileService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<PublicFile> {
    return this.publicFileService.findOne(+id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updatePublicFileDto: UpdatePublicFileDto
  ): string {
    return this.publicFileService.update(+id, updatePublicFileDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): string {
    return this.publicFileService.remove(+id);
  }
}
