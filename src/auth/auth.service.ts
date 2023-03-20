import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { LoginUserDto } from '@src/auth/dto/login-user.dto';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';
import { UserResponseDto } from '@src/common/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser(
    user: LoginUserDto
  ): Promise<UserResponseDto> {
    const foundUser: User = await this.userService.findByEmail(
      user.email
    );

    const isPasswordValid: boolean = foundUser
      ? await this.compareUserPassword(
          user.password,
          foundUser.password
        )
      : false;

    if (!foundUser || !isPasswordValid) {
      throw new BadRequestException('Incorrect username or password');
    }

    if (!foundUser.isActive) {
      throw new BadRequestException(
        'Please, activate your email first.'
      );
    }

    return this.userService.mapUserToUserResponseDto(foundUser);
  }

  private async compareUserPassword(
    candidatePassword,
    password
  ): Promise<boolean> {
    return await compare(candidatePassword, password);
  }
}
