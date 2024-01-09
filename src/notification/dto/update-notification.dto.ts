import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateNotificationDto } from "./create-notification.dto";

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {}

export class UpdateAlarmDto {
  @ApiProperty()
  value: 1 | 0;
}
