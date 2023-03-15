import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@src/user/user.service';
import { AuthService } from '@src/auth/auth.service';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    // const request = context.switchToHttp().getRequest();

    // await this.authService.validateUser(request.body);
    // await this.userService.checkActivation(request.body.email);

    await super.logIn(context.switchToHttp().getRequest());

    return result;
  }
}
