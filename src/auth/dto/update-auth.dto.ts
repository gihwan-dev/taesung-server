import { PartialType } from "@nestjs/mapped-types";
import { CreateAuthDto } from "./create-auth.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}

export class UpdateNameDto {
  @ApiProperty()
  name: string;
  email: string;
}
