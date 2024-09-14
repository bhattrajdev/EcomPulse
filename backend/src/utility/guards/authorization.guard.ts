import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const allowedRole = this.reflector.get<string>('allowedRoles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const userRoles = request?.currentUser?.roles || [];
    
    // Check if userRoles includes the allowedRole
    const isAuthorized = userRoles.includes(allowedRole);
    
    if (isAuthorized) {
      return true;
    } else {
      throw new UnauthorizedException("Sorry, you are not authorized.");
    }
  }
}
