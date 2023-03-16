import { User } from '@src/user/entities/user.entity';

export class UserResponseDto
  implements
    Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'profile'>
{
  email: string;
  id: number;
  isActive: boolean;
}
