import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { User, UserSchema } from "./user.schema"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { AuthMiddleware } from "../auth/auth.middleware"
import { AuthUtils } from "src/auth/auth.utils"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthUtils],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController)
  }
}
