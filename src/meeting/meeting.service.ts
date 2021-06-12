import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { CreateMeetingDto } from "./meeting.dto"
import { Meeting as MeetingModel, MeetingDoc } from "./meeting.schema"
import { MeetingUtils } from "./meeting.utils"

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel(MeetingModel.name) private Meeting: Model<MeetingDoc>,
    private meetingUtils: MeetingUtils,
  ) {}

  createMeeting(id: string, body: CreateMeetingDto) {
    this.meetingUtils.checkTime(body)
    const { slots, slotsCount } = this.meetingUtils.createSlots(body)
    return this.Meeting.create({ ...body, user: id, slots, slotsCount })
  }
}
