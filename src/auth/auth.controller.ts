import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { LoginUserDto } from '@src/auth/dto/login-user.dto';
import { LoggedInGuard } from '@src/auth/guards/logged-in.guard';
import { LogoutGuard } from '@src/auth/guards/logout.guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalGuard)
  public loginUser(@Body() user: LoginUserDto): void {
    return;
  }

  @Post('logout')
  @HttpCode(204)
  @UseGuards(LoggedInGuard, LogoutGuard)
  public logoutUser(): void {
    return;
  }
}
