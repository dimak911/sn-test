import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@src/auth/dto/login-user.dto';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { LoggedInGuard } from '@src/auth/guards/logged-in.guard';
import { LogoutGuard } from '@src/auth/guards/logout.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public registerUser(@Body() user: CreateUserDto) {
    const response = this.authService.registerUser(user);

    return response;
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalGuard)
  public async loginUser(@Body() user: LoginUserDto) {
    return;
  }

  @Post('logout')
  @HttpCode(204)
  @UseGuards(LoggedInGuard, LogoutGuard)
  public logoutUser() {
    return;
  }
}
