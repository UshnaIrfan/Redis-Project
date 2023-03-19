import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document  } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AuthDocument = Auth & Document ;

@Schema({
  collection: 'users',
  timestamps: true,
})

@Schema()
export class Auth {

  @ApiProperty()
  @Prop()
  username: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  email: string;
}
export const AuthSchema =SchemaFactory.createForClass(Auth);

