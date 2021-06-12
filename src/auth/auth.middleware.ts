import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"
import { NextFunction } from "express"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

import { User as UserModel, UserDoc } from "src/user/user.schema"
import { AuthUtils } from "./auth.utils"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(UserModel.name) private User: Model<UserDoc>,
    private authUtils: AuthUtils,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    this.authUtils.extractToken(req)

    const id = this.authUtils.decodeToken(req)

    const user = await this.User.findById(id).select("-password")

    if (!user) {
      throw new UnauthorizedException("unauthorized access")
    }

    req.user = user

    next()
  }
}
