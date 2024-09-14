import { CanActivate, ExecutionContext, Injectable, mixin, Type, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

// @Injectable()
// export class AuthorizeGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const allowedRole = this.reflector.get<string>('allowedRoles', context.getHandler());
//     const request = context.switchToHttp().getRequest();
//     const userRoles = request?.currentUser?.roles || [];
    
//     // Check if userRoles includes the allowedRole
//     const isAuthorized = userRoles.includes(allowedRole);
    
//     if (isAuthorized) {
//       return true;
//     } else {
//       throw new UnauthorizedException("Sorry, you are not authorized.");
//     }
//   }
// }

// The factory pattern approach:
export const AuthorizeGuard=(allowedRoles: string)=> {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const userRoles = request?.currentUser?.roles;
       
      // Check if userRoles includes any of the allowedRoles
      const isAuthorized = allowedRoles.includes(userRoles);
      
      if (isAuthorized) 
        return true;
        throw new UnauthorizedException("Sorry, you are not authorized.");
      
    }
  }

  const guard = mixin(RolesGuardMixin)
  return guard
}
