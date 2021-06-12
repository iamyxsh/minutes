import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "../user/user.schema"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { AuthUtils } from "./auth.utils"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthUtils],
})
export class AuthModule {}
