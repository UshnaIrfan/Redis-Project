import { ApiProperty } from '@nestjs/swagger';

export   class ForgotPassword
{
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  newPassword: string;
}