import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "src/configs/security"
import { User as UserModel, UserDoc } from "src/user/user.schema"

@Injectable()
export class AuthUtils {
  constructor(@InjectModel(UserModel.name) private User: Model<UserDoc>) {}

  async hashPass(pass: string): Promise<string> {
    return bcrypt.hash(pass, 8)
  }

  async comparePass(pass: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pass, hash)
  }

  async checkPassword(pass: string, hash: string): Promise<void> {
    const correctPass = await this.comparePass(pass, hash)

    if (!correctPass) {
      throw new UnauthorizedException("invalid credentials")
    }
  }

  async genToken(id: string): Promise<string> {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" })
  }

  async checkUniqueEmail(email: string) {
    const user = await this.User.findOne({ email })

    if (user) {
      throw new BadRequestException("invalid credentials")
    }
  }
}
