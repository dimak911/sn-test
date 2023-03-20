import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePublicFileDto } from './dto/update-public-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { PublicFileResponseDto } from '@src/common/dto/public-file-response.dto';
import { MinioClientService } from '@src/minio-client/minio-client.service';

@Injectable()
export class PublicFileService {
  constructor(
    @InjectRepository(PublicFile)
    private readonly publicFileRepository: Repository<PublicFile>,
    private readonly minioClientService: MinioClientService
  ) {}

  public async createFile(
    file: Express.Multer.File
  ): Promise<PublicFile> {
    const fileType = file.mimetype.split('/')[0] as 'video' | 'image';
    const fileName = await this.minioClientService.uploadFile(file);
    const fileUrl = this.minioClientService.getFileUrl(fileName);

    return this.publicFileRepository.create({
      key: fileName,
      url: fileUrl,
      type: fileType,
    });
  }

  public async createAvatarFile(
    file: Express.Multer.File
  ): Promise<PublicFile> {
    if (!file.mimetype.includes('image')) {
      throw new BadRequestException('Only images acceptable');
    }

    return await this.createFile(file);
  }

  public mapPublicFileToPublicFileResponseDto(
    publicFile: PublicFile
  ): PublicFileResponseDto {
    const response = new PublicFileResponseDto();

    response.id = publicFile.id;
    response.url = publicFile.url;
    response.type = publicFile.type;

    return response;
  }

  public findAll(): string {
    return `This action returns all publicFile`;
  }

  public findOne(id: number): Promise<PublicFile> {
    return this.publicFileRepository.findOne({ where: { id } });
  }

  public update(
    id: number,
    updatePublicFileDto: UpdatePublicFileDto
  ): string {
    return `This action updates a #${id} publicFile`;
  }

  public remove(id: number): string {
    return `This action removes a #${id} publicFile`;
  }
}
