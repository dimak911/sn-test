import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoggedInGuard } from '@src/auth/guards/logged-in.guard';
import { IdParams } from '@src/common/dto/id.params';
import { TokenParams } from '@src/common/dto/token.params';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { User } from '@src/user/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  public registerUser(
    @Body() user: CreateUserDto
  ): Promise<{ message: string }> {
    return this.userService.registerUser(user);
  }

  @UseGuards(LoggedInGuard)
  @Get()
  public findAll(): Promise<string> {
    return this.userService.findAll();
  }

  @UseGuards(LoggedInGuard)
  @Get(':id')
  public findOneById(
    @Param() { id }: IdParams
  ): Promise<Omit<User, 'password'>> {
    return this.userService.findById(+id);
  }

  @Patch('verify/:token')
  public verify(
    @Param() { token }: TokenParams
  ): Promise<{ message: string }> {
    return this.userService.verifyEmail(token);
  }
}
