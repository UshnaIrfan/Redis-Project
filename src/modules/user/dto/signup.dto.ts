import { ApiProperty } from '@nestjs/swagger';

export   class SignupUser
{

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}