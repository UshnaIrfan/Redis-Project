import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotAcceptableException } from "@nestjs/common";
import {jwtConstants} from "../constants/constants";
import {Auth} from "../../auth/schema/AuthSchema";
import { UnauthorizedException, } from '@nestjs/common'
import {AuthService} from "../../auth/auth.service";
import * as bcrypt from 'bcrypt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly authService:AuthService)
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload:any): Promise<Auth> {
    const user = await this.authService .findUserByUsername(payload.username);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    const passwordValid = await bcrypt.compare(payload.password, user.password);
    if (passwordValid) {
      return user;
    }
  }

}