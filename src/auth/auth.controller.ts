import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { LocalGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@src/auth/dto/login-user.dto';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { Active } from '@src/auth/guards/active.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: CreateUserDto) {
    const response = this.authService.registerUser(user);

    return response;
  }

  @UseGuards(LocalGuard, Active)
  @Post('login')
  @HttpCode(200)
  loginUser(@Req() req, @Body() user: LoginUserDto) {
    return { message: 'OK' };
  }
}
