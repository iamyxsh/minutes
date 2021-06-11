import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthUtils {
  async hashPass(pass: string): Promise<string> {
    return bcrypt.hash(pass, 8)
  }
}
