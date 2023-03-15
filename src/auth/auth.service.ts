import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { LoginUserDto } from '@src/auth/dto/login-user.dto';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { UserService } from '@src/user/user.service';
import { IUser } from '@src/user/models/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser(user: LoginUserDto) {
    const foundUser = await this.userService.findByEmail(user.email);

    if (
      !foundUser ||
      !(await compare(user.password, foundUser.password))
    ) {
      throw new BadRequestException('Incorrect username or password');
    }
    const { password: _password, ...retUser } = foundUser;

    return retUser;
  }

  public async registerUser(user: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(
      user.email
    );

    if (existingUser) {
      throw new BadRequestException(
        `User with email ${user.email} already exists`
      );
    }

    const hashPassword = await hash(user.password, 10);

    const newUser: IUser = await this.userService.create({
      ...user,
      password: hashPassword,
    });

    return {
      message:
        'We send you a verification email. Please confirm it first.',
    };
  }
}
