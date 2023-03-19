import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import {AuthService} from "../../auth/auth.service";
import {Auth} from "../../auth/schema/AuthSchema";
import * as bcrypt from 'bcrypt';
@Injectable()
export class LocalAuthGuard extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string ,password:any): Promise<Auth> {
    const user = await this.authService.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user
  }
}
