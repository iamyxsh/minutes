import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from "class-validator"
import { Interval } from "./meeting.schema"

export class CreateMeetingDto {
  @IsNotEmpty()
  @IsDateString()
  start: Date

  @IsNotEmpty()
  @IsDateString()
  end: Date

  @IsNumber()
  @IsNotEmpty()
  @IsEnum(Interval)
  interval: Interval
}
