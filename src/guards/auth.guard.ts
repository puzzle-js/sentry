import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const data = context.switchToWs().getData();
    const allowed = data.auth && data.auth === process.env.AUTH_SECRET;
    return allowed;
  }
}
