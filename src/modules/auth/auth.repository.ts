import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import {Auth,AuthDocument} from "./schema/AuthSchema";
import { Model } from "mongoose";
@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(Auth.name) private AuthModel: Model<AuthDocument>,
  ) {}

  //user sign up
  async createUser(auth: Auth): Promise<any>
  {
    return this.AuthModel.create(auth);
  }

  //user login
  async findUserByUsername(username: string): Promise<Auth| null>
  {
    return this.AuthModel.findOne({
      username,
    })
  }

  //find email for updatePassword and delete User and token(authorization)
  async findUserByEmail(email:string): Promise<Auth | null>
  {
    return this.AuthModel.findOne({
      email,
    });
  }

  //update password
  async update(email: string, password: string): Promise<Auth | null>
  {
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        password: password
      },
    };
    return this.AuthModel.findOneAndUpdate(filter, updateDoc, options);
  }

  // delete User
  async deleteUser(email: string): Promise<Auth | null>
  {
    return this.AuthModel.findOneAndDelete({
      email,
    },);
  }
}
