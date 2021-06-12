import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { SignupDto, SigninDto, SigninRes } from "./auth.dto"
import { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  @UsePipes(ValidationPipe)
  async signup(@Body() body: SignupDto) {
    const { name, email, id } = await this.authService.signup(body)

    return { name, email, id }
  }

  @Post("signin")
  @UsePipes(ValidationPipe)
  async signin(@Body() body: SigninDto): Promise<SigninRes> {
    return this.authService.signin(body)
  }
}
