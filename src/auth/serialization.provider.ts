import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  public serializeUser(
    user: User,
    done: (err: Error, user: { id: number }) => void
  ) {
    done(null, { id: user.id });
  }

  public async deserializeUser(
    payload: { id: number; role: string },
    done: (err: Error, user: Omit<User, 'password'>) => void
  ) {
    const user = await this.userService.findById(payload.id);
    done(null, user);
  }
}
