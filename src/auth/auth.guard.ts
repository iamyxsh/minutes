import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { AuthUtils } from "./auth.utils"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authUtils: AuthUtils) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    return this.authUtils.extractToken(request)
  }
}
