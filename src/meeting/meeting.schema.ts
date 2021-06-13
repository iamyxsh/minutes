import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import * as mongoose from "mongoose"

import { User } from "src/user/user.schema"

export type MeetingDoc = Meeting & Document

export enum Interval {
  A = 15,
  B = 30,
  D = 60,
}

@Schema({ timestamps: true })
export class Meeting {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  user: User

  @Prop({ required: true })
  start: Date

  @Prop({ required: true })
  end: Date

  @Prop({ required: true })
  interval: Interval

  @Prop({ required: true })
  slots: Date[]

  @Prop({ required: true, max: 24 })
  slotsCount: number

  @Prop({ required: true, maxlength: 6, minlength: 6 })
  link: string
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting)
