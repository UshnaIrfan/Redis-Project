import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {AuthModule} from "../auth/auth.module";
import {AuthRepository} from "../auth/auth.repository";
import { AuthService } from "../auth/auth.service";
import {localAuthGuard} from "./guards/local-guard";
import {LocalAuthGuard} from "./strategies/local-strategy";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {jwtConstants} from "./constants/constants";
import {JwtStrategy} from "./strategies/jwt-strategy";
import {JWTGuard} from "./guards/jwt-guard";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [AuthModule,
    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions: { expiresIn: '3600s' }
    })],
  controllers: [UserController],
  providers: [UserService , LocalAuthGuard,AuthRepository,AuthService  ,localAuthGuard ,JWTGuard,JwtStrategy]
})
export class UserModule {}
