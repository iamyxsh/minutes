import { BadRequestException, Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { User as UserModel, UserDoc } from "src/user/user.schema"
import { EditProfileDto } from "./user.dto"
import { AuthUtils } from "src/auth/auth.utils"

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private User: Model<UserDoc>,
    private authUtils: AuthUtils,
  ) {}

  async editProfile(id: string, body: EditProfileDto) {
    const { name, email, password } = body

    if (password) {
      if (password.length < 5) {
        throw new BadRequestException("password must be more than 5 characters")
      }
      const hash = await this.authUtils.hashPass(password)
      return this.User.findByIdAndUpdate(
        id,
        { email, name, password: hash },
        { new: true },
      ).select("-password")
    } else {
      return this.User.findByIdAndUpdate(
        id,
        { email, name },
        { new: true },
      ).select("-password")
    }
  }
}
