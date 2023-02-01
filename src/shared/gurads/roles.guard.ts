import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/shared.interfaces';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Reports role guard to authorize access to reports module.
 * Filters jpAuthIds from users only else it will throw a forbidden error response.
 */
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return requiredRoles.includes(Role.ADMIN);
  }
}
