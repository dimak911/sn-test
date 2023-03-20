import { PublicFile } from '@src/public-file/entities/public-file.entity';

export class PublicFileResponseDto
  implements Omit<PublicFile, 'createdAt' | 'updatedAt' | 'key'>
{
  id: number;
  type: 'video' | 'image';
  url: string;
}
