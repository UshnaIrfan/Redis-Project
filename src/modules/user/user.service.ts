import { ForbiddenException, Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { AuthService } from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";
import {SignupUser} from "./dto/signup.dto";
import {ForgotPassword} from "./dto/Forget.dto";
import {deleteUser} from "./dto/delete.dto";


@Injectable()
export class UserService {

  constructor(

    private authService:AuthService,
    private jwtService:JwtService
  ) {}

  // user sign up
  async signup(signUpUserDto:SignupUser)
  {
    const { password } = signUpUserDto;
    const user = await this.authService.createUser({
      ...signUpUserDto,
      password: await UserService.hashPassword(password),
    });
    const payload = {
      username: user.username,
      email: user.email,
      password:user.password
    };
    return{
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
  //hashed password to save in database
  private static async hashPassword(password: string): Promise<string>
  {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  //  user login
  async login(user: any)
  {
    const payload = {
      username: user.username,
      email: user.email,
      password:user.password
    };
    return {
      username: user.username,
      access_token:this.jwtService.sign(payload)

    };
  }

  // forget Password
  async forgotPassword(reqBody: ForgotPassword) {
    const user = await this.authService.findUserByEmail( reqBody.email);
    if (!user)
    {
      throw new NotAcceptableException('user not exist');
    }
    else
    {
      if(reqBody.password != reqBody.newPassword)
      {
        throw new NotAcceptableException('not matched password');
      }
      if(reqBody.password == reqBody.newPassword)
      {
        const   hashPassword = await UserService.hashPassword(reqBody.newPassword);
        var result = await this.authService.updatePassword(reqBody.email, hashPassword);
      }
      return "Successfully updated  new password is " +  result.password
    }
  }

  // delete user
  async deleteUser(reqBody: deleteUser) {
    const user = await this.authService.findUserByEmail( reqBody.email);
    if (!user)
    {
      throw new NotAcceptableException('user not exist');
    }
    else
    {
      const result = await this.authService.deleteUser(reqBody.email);
    }
    return  "Successfully this User  Deleted" + user
  }

}
