import {
  Controller,
  Get,
  // Post,
  // Body,
  Patch,
  Param,
  // Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { LoggedInGuard } from '@src/auth/logged-in.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LoggedInGuard)
  @Get()
  public findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  public findOneById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  // @Patch(':id')
  // public update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // public remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }

  @Patch('verify/:token')
  public verify(@Param('token') token: string) {
    return this.userService.verify(token);
  }
}
