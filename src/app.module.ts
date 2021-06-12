import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { mongoURI } from "./configs/database"
import { UserModule } from "./user/user.module"
import { MeetingModule } from './meeting/meeting.module';

const mongoseOpts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
}

@Module({
  imports: [
    MongooseModule.forRoot(mongoURI, mongoseOpts),
    AuthModule,
    UserModule,
    MeetingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
