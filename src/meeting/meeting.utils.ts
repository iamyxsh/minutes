import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import * as randomString from "randomstring"

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

    const st = new Date(start)
    const en = new Date(end)

    const startTime = st.getTime()
    const endTime = en.getTime()

    this.checkExactHour(st, en)

    this.checkSameDate(st, en)

    this.checkTimeInPast(startTime, endTime)

    this.checkEndInFuture(startTime, endTime)
  }

  checkDuplicateTime(body: CreateMeetingDto, meetings: any[]) {
    let { start, end } = body
    start = new Date(start)
    end = new Date(end)

    const date = start.getDate()
    const startHour = start.getHours() - 5
    const endHour = end.getHours() - 5
    const hourArr = this.range(endHour - startHour, startHour)

    if (meetings.length === 0) {
      return
    }

    const sameDateMeetings = meetings.map((meet) => {
      if (meet.start.getDate() === date) {
        return meet
      }
    })

    this.checkClash(sameDateMeetings, hourArr)
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

  checkExactHour(start: Date, end: Date) {
    if (
      start.getMinutes() - 30 !== 0 ||
      end.getMinutes() - 30 !== 0 ||
      start.getSeconds() !== 0 ||
      end.getSeconds() !== 0 ||
      start.getMilliseconds() !== 0 ||
      end.getMilliseconds() !== 0
    ) {
      throw new BadRequestException(
        "start and end time should be exact hour with no minutes, seconds or ms.",
      )
    }
  }

  checkSameDate(start: Date, end: Date) {
    if (start.getDate() !== end.getDate()) {
      throw new BadRequestException("start and end time should be of same date")
    }
  }

  checkTimeInPast(start: number, end: number) {
    if (start < Date.now() || end < Date.now()) {
      throw new BadRequestException("start and end time should be in future")
    }
  }

  checkEndInFuture(start: number, end: number) {
    if (start > end || start === end) {
      throw new BadRequestException(
        "end time should be in future regarding to the start time",
      )
    }
  }

  checkHourDiff(start: Date, end: Date) {
    const hourDiff = end.getHours() - start.getHours()
    if (hourDiff > 6) {
      throw new BadRequestException("max difference can be 6 hours")
    }
  }

  checkClash(meetingArr: any[], hourArr: number[]) {
    let filteredArray = []

    for (const meet of meetingArr) {
      // console.log(meet)
      const startHour = new Date(meet.start).getHours() - 5
      const endHour = new Date(meet.end).getHours() - 5
      const hourArray = this.range(endHour - startHour, startHour)

      const filArr = hourArr.filter((value) => hourArray.includes(value))

      filteredArray = [...filArr]
    }

    try {
      if (filteredArray.length > 0) {
        throw new Error()
      }
    } catch (err) {
      throw new BadRequestException(
        "already a meeting in between start and end",
      )
    }
  }

  async generateLink(): Promise<string> {
    let link = randomString.generate({
      length: 6,
      charset: "alphabetic",
    })

    const meeting = await this.Meeting.findOne({ link })

    if (meeting) {
      link = await this.generateLink()
    }

    return link
  }

  range(size: number, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt)
  }
}
