import {
  Body,
  Controller,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { CreateMeetingDto } from "./meeting.dto"
import { MeetingService } from "./meeting.service"

@Controller("meeting")
export class MeetingController {
  constructor(private meetingService: MeetingService) {}

  @Post("")
  @UsePipes(ValidationPipe)
  createMeeting(@Body() body: CreateMeetingDto, @Req() req: any) {
    return this.meetingService.createMeeting(req.user.id, body)
  }
}
