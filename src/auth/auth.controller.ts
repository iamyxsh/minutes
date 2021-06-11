import { Body, Controller, Post } from "@nestjs/common"
import { User } from "src/user/user.schema"
import { SigninDto } from "./auth.dto"
import { AuthService } from "./auth.service"

interface SiginRes {
  name: string
  email: string
  id: string
}

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signin")
  async signin(@Body() body: SigninDto): Promise<SiginRes> {
    const { name, email, id } = await this.authService.signin(body)

    return { name, email, id }
  }
}
