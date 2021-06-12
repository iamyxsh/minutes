import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { EditProfileDto } from "./user.dto"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Req() req: any) {
    return req.user
  }

  @Patch("profile")
  @UsePipes(ValidationPipe)
  editProfile(@Req() req: any, @Body() body: EditProfileDto) {
    return this.userService.editProfile(req.user.id, body)
  }
}
