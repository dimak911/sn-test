import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginUserDto } from '@src/auth/dto/login-user.dto';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser(
    user: LoginUserDto
  ): Promise<Omit<User, 'password'>> {
    const foundUser: User = await this.userService.findByEmail(
      user.email
    );

    const isPasswordValid: boolean = await this.compareUserPassword(
      user.password,
      foundUser.password
    );

    if (!foundUser || !isPasswordValid) {
      throw new BadRequestException('Incorrect username or password');
    }

    if (!foundUser.isActive) {
      throw new BadRequestException(
        'Please, activate your email first.'
      );
    }

    const { password: _password, ...retUser } = foundUser;

    return retUser;
  }

  private async compareUserPassword(
    candidatePassword,
    password
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, password);
  }
}
