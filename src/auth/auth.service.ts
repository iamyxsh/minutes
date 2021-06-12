import { Injectable, UnauthorizedException } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { User as UserModel, UserDoc } from "src/user/user.schema"
import { SignupDto, SigninDto, SigninRes } from "./auth.dto"
import { AuthUtils } from "./auth.utils"

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private User: Model<UserDoc>,
    private authUtils: AuthUtils,
  ) {}

  async signup(body: SignupDto) {
    const { name, email, password } = body

    await this.authUtils.checkUniqueEmail(email)

    const hashPass = await this.authUtils.hashPass(password)

    return this.User.create({ name, email, password: hashPass })
  }

  async signin(body: SigninDto): Promise<SigninRes> {
    const { email, password } = body
    const user = await this.User.findOne({ email })

    if (!user) {
      throw new UnauthorizedException("invalid credentials")
    }

    await this.authUtils.checkPassword(password, user.password)

    const token = await this.authUtils.genToken(user.id)

    user.password = ""

    return { user, token }
  }
}
