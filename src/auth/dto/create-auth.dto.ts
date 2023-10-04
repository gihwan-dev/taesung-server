import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;
}

export class LoginUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
