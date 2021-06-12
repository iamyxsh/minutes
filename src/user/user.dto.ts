import { IsString, MaxLength } from "class-validator"

import { SignupDto } from "src/auth/auth.dto"

export class EditProfileDto extends SignupDto {
  @IsString()
  @MaxLength(30)
  password?: string
}
