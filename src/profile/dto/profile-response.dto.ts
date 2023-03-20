import { Profile } from '@src/profile/entities/profile.entity';
import { PublicFileResponseDto } from '@src/common/dto/public-file-response.dto';

export class ProfileResponseDto
  implements
    Omit<Profile, 'createdAt' | 'updatedAt' | 'user' | 'avatar'>
{
  avatar: PublicFileResponseDto | null;
  description: string;
  firstName: string;
  id: number;
  lastName: string;
}
