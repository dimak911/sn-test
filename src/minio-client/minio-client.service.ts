import { BadRequestException, Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { ConnectionConfigService } from '@src/custom-config/connection-config.service';
import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { policySettingsConst } from '@src/minio-client/consts/policy-settings.const';
import { Readable as ReadableStream } from 'stream';
import { fileTypesConst } from '@src/minio-client/consts/file-types.const';

@Injectable()
export class MinioClientService {
  private minioClient: Minio.Client;
  private readonly bucketName: string;
  private readonly bucketHost: string;
  private readonly bucketPort: string;

  constructor(
    private readonly connectionConfigService: ConnectionConfigService,
    private readonly customConfigService: CustomConfigService
  ) {
    this.minioClient = new Minio.Client(
      this.connectionConfigService.initMinIoConnection()
    );
    this.bucketName = this.customConfigService.get(
      'MINIO_BUCKET_NAME'
    );
    this.bucketHost = this.customConfigService.get('MINIO_HOST');
    this.bucketPort = this.customConfigService.get('MINIO_PORT');

    this.minioClient
      .setBucketPolicy(
        this.bucketName,
        JSON.stringify(policySettingsConst)
      )
      .catch(console.log);
  }

  public async createBucketIfNotExists(): Promise<void> {
    const bucketExists = await this.minioClient.bucketExists(
      this.bucketName
    );
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName);
    }
  }

  private createFileName(originalName: string): string {
    return `${Date.now()}-${originalName}`;
  }

  public async uploadFile(
    file: Express.Multer.File
  ): Promise<string> {
    if (!fileTypesConst.includes(file.mimetype)) {
      throw new BadRequestException('File type not supported');
    }

    await this.createBucketIfNotExists();

    const fileName = this.createFileName(file.originalname);

    const metaData = {
      'Content-Type': file.mimetype,
    };

    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
      metaData
    );
    return fileName;
  }

  public getFileUrl(fileName: string): string {
    return `${this.bucketHost}:${this.bucketPort}/${this.bucketName}/${fileName}`;
  }

  public async getObject(fileName: string): Promise<ReadableStream> {
    return await this.minioClient.getObject(
      this.bucketName,
      fileName
    );
  }

  public async deleteFile(fileName: string): Promise<void> {
    await this.minioClient.removeObject(this.bucketName, fileName);
  }
}
