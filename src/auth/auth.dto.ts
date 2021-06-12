import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator"
import { User } from "src/user/user.schema"

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(5)
  name: string

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(20)
  @MinLength(5)
  email: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @MinLength(5)
  password: string
}

export class SigninDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(20)
  @MinLength(5)
  email: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @MinLength(5)
  password: string
}

export class SigninRes {
  user: User
  token: string
}
