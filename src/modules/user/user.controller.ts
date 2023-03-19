import { Controller, Get, Post, Body, Request, Put, Delete, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { ApiBearerAuth,ApiBody } from "@nestjs/swagger";
import {localAuthGuard} from "./guards/local-guard";
import {JWTGuard} from "./guards/jwt-guard";
import {SignupUser} from "./dto/signup.dto";
import {LoginUser} from "./dto/login.dto";
import {ForgotPassword} from "./dto/Forget.dto";
import {deleteUser} from "./dto/delete.dto";

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // user profile Get
  @ApiBearerAuth()
  @UseGuards(JWTGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // user sign up
  @Post('/signup')
  async signup(@Body() signUpUserDto: SignupUser) {
    return this.userService.signup(signUpUserDto);
  }

  // user login
  @ApiBody({ type: LoginUser})
  @ApiBearerAuth()
  @UseGuards(localAuthGuard)
  @Post('/login')
  async login(@Body() loginUser: LoginUser)
  {
    return this.userService.login(loginUser);
  }

  //forgetPassword
  @Put('/forgotPassword')
  async forgotPassword(
    @Body() reqBody: ForgotPassword): Promise<any> {
    return this.userService.forgotPassword(reqBody);
  }

  //deleteUser
  @Delete('/delete')
  async deleteUser(
    @Body() reqBody: deleteUser): Promise<any> {
    return this.userService.deleteUser(reqBody);
  }

}
