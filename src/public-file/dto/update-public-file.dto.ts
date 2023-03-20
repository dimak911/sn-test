import { PartialType } from '@nestjs/swagger';
import { CreatePublicFileDto } from './create-public-file.dto';

export class UpdatePublicFileDto extends PartialType(CreatePublicFileDto) {}
