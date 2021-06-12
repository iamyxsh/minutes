import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthMiddleware } from "src/auth/auth.middleware"
import { AuthUtils } from "src/auth/auth.utils"
import { User, UserSchema } from "src/user/user.schema"
import { MeetingController } from "./meeting.controller"
import { Meeting, MeetingSchema } from "./meeting.schema"
import { MeetingService } from "./meeting.service"
import { MeetingUtils } from "./meeting.utils"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Meeting.name, schema: MeetingSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [MeetingController],
  providers: [MeetingService, AuthUtils, MeetingUtils],
})
export class MeetingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(MeetingController)
  }
}
