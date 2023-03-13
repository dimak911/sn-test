import {
  ExecutionContext,
  Injectable,
  CanActivate,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '@src/user/user.service';

@Injectable()
export class Active implements CanActivate {
  constructor(readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const isUserActive = await this.userService.checkActivation(
      request.body.email
    );

    if (!isUserActive) {
      throw new BadRequestException(
        'Please, activate your email first.'
      );
    }

    return true;
  }
}
