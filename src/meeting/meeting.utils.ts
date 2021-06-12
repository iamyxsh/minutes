import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { User as UserModel, UserDoc } from "src/user/user.schema"
import { CreateMeetingDto } from "./meeting.dto"
import { MeetingDoc, Meeting as MeetingModel } from "./meeting.schema"

@Injectable()
export class MeetingUtils {
  constructor(
    @InjectModel(UserModel.name) private User: Model<UserDoc>,
    @InjectModel(MeetingModel.name) private Meeting: Model<MeetingDoc>,
  ) {}

  checkTime(body: CreateMeetingDto) {
    const { start, end } = body

    if (new Date(start).getDate() !== new Date(end).getDate()) {
      throw new BadRequestException("start and end time should be of same date")
    }

    const startTime = new Date(start).getTime()
    const endTime = new Date(end).getTime()

    if (startTime < Date.now() || endTime < Date.now()) {
      throw new BadRequestException("start and end time should be in future")
    }

    if (startTime > endTime || startTime === endTime) {
      throw new BadRequestException(
        "end time should be in future regarding to the start time",
      )
    }

    const hourDiff = new Date(end).getHours() - new Date(start).getHours()
    if (hourDiff > 6) {
      throw new BadRequestException("max difference can be 6 hours")
    }
  }

  createSlots(body: CreateMeetingDto) {
    const { start, end, interval } = body

    const startTime = new Date(start).getTime()
    const endTime = new Date(end).getTime()
    const intervalTime = interval * 60 * 1000

    const timeDiff = endTime - startTime

    const slotsCount = timeDiff / intervalTime

    const slots = []
    slots.push(start)

    for (let i = 1; i <= slotsCount; i++) {
      const temp = startTime + i * intervalTime

      slots.push(new Date(temp).toISOString())
    }

    return { slots, slotsCount }
  }
}
