import { Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { User as UserModel, UserDoc } from "src/user/user.schema"
import { SigninDto } from "./auth.dto"
import { AuthUtils } from "./auth.utils"

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private User: Model<UserDoc>,
    private authUtils: AuthUtils,
  ) {}

  async signin(body: SigninDto) {
    const { name, email, password } = body

    const hashPass = await this.authUtils.hashPass(password)

    return this.User.create({ name, email, password: hashPass })
  }
}
