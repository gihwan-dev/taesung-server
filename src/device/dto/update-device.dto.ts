import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDeviceDto } from "./create-device.dto";

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}

export class UpdateDeviceNameDto {
  @ApiProperty()
  name: string;
}

export class UpdateOuDto {
  @ApiProperty()
  ou: number;
}
