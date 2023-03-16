import { Profile } from '@src/profile/entities/profile.entity';

export class ProfileResponseDto
  implements Omit<Profile, 'createdAt' | 'updatedAt' | 'user'>
{
  avatar: string;
  description: string;
  firstName: string;
  id: number;
  lastName: string;
}
