import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoggedInGuard } from '@src/auth/guards/logged-in.guard';
import { VerifyTokenParams } from '@src/user/dto/verify-token.params';
import { FindOneUserParams } from '@src/user/dto/find-one-user.params';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LoggedInGuard)
  @Get()
  public findAll() {
    return this.userService.findAll();
  }

  @UseGuards(LoggedInGuard)
  @Get(':id')
  public findOneById(@Param() { id }: FindOneUserParams) {
    console.log('id: ', id);
    return this.userService.findById(+id);
  }

  @Patch('verify/:token')
  public verify(@Param() { token }: VerifyTokenParams) {
    return this.userService.verify(token);
  }
}
