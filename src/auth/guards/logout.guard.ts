import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class LogoutGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    request.logout(() => {
      console.log('logout done');
    });

    return !request.isAuthenticated();
  }
}
