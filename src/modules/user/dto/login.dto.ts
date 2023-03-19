import { ApiProperty } from '@nestjs/swagger';
export    class LoginUser {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly email: string;
}
