import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Get("")
  getMeetingsOfLoggedUser(@Req() req: any) {
    return this.meetingService.getMeetingsOfLoggedUser(req.user.id)
  }

  @Get("/:link")
  getMeetingByLink(@Param() param: any) {
    return this.meetingService.getMeetingByLink(param.link)
  }

  @Delete("/:id")
  deleteMeetingById(@Param() param: any, @Req() req: any) {
    return this.meetingService.deleteMeetingByLink(param.id, req.user.id)
  }
}
