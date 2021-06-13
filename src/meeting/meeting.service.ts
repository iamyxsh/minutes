import { Injectable, UnauthorizedException } from "@nestjs/common"
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

  async createMeeting(id: any, body: CreateMeetingDto) {
    this.meetingUtils.checkTime(body)

    const { slots, slotsCount } = this.meetingUtils.createSlots(body)
    const link = await this.meetingUtils.generateLink()

    const meetings = await this.Meeting.find({ user: id })

    this.meetingUtils.checkDuplicateTime(body, meetings)

    return this.Meeting.create({ ...body, user: id, slots, slotsCount, link })
  }

  getMeetingsOfLoggedUser(id: any) {
    return this.Meeting.find({ user: id })
  }

  getMeetingByLink(link: string) {
    return this.Meeting.findOne({ link }).populate("user", "-password")
  }

  async deleteMeetingByLink(meetingId: string, userId: string) {
    const meeting = (await this.Meeting.findById(meetingId)) as any

    if (meeting.user.id === userId) {
      throw new UnauthorizedException("unauthorized access")
    }

    return this.Meeting.findByIdAndDelete({ id: meetingId })
  }
}
