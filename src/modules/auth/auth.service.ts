import { Injectable } from '@nestjs/common';
import {Auth} from "./schema/AuthSchema";
import {AuthRepository} from "./auth.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly  authRepository:AuthRepository
  ) {}

  // user sign up
  async createUser(user: any): Promise<Auth>
  {
    return this.authRepository.createUser(user);
  }

  //user login
  async findUserByUsername(username: string): Promise<Auth| null>
  {
    return this.authRepository.findUserByUsername(username);
  }

  // find email for updatePassword and delete user
  async findUserByEmail(email:string): Promise<Auth | null>
  {
    return this.authRepository.findUserByEmail(email);
  }

  //update password
  async updatePassword(email: string, password: string): Promise<Auth | null>
  {
    return this.authRepository.update(email, password);
  }

  // delete User
  async deleteUser(email: string): Promise<Auth | null>
  {
    return this.authRepository.deleteUser(email);
  }

}
