import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"

export type UserDoc = User & Document

@Schema()
export class User {
  @Prop({ required: true, max: 20, min: 5 })
  name: string

  @Prop({ required: true, max: 20, min: 5 })
  email: string

  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
