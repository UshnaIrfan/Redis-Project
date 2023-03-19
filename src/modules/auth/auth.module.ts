import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Auth,AuthSchema} from "./schema/AuthSchema";
import { MongooseModule } from "@nestjs/mongoose";
import {AuthRepository} from "./auth.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema},

    ])
  ],
  controllers: [],
  providers: [AuthService ,AuthRepository],
  exports: [
    MongooseModule,
    AuthRepository,
    AuthService
  ],
})
export class AuthModule {}
