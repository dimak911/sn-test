import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { IUser } from '@src/user/models/user.interface';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: IUser, done: (err: Error, user: { id: number }) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: { id: number; role: string },
    done: (err: Error, user: Omit<IUser, 'password'>) => void,
  ) {
    const user = await this.userService.findById(payload.id);
    done(null, user);
  }
}
