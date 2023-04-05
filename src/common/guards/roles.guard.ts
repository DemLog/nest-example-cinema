import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: Token = request.user;
    if (!user) {
      throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED)
    }

    if (user.roles === 'admin') {
      return true;
    }

    if (!roles.includes(user.roles)) {
      throw new HttpException("Недостаточно прав для выполнения операции.", HttpStatus.FORBIDDEN)
    }

    const userId = +request.params.id;
    console.log(request.params, user.userId)
    if (userId && userId !== user.userId) {
      throw new HttpException("Недостаточно прав для выполнения операции.", HttpStatus.FORBIDDEN);
    }
    return true;
  }
}