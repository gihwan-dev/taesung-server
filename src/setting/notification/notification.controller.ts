import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Controller("/setting/notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.notificationService.findOne(+id);
  }
}
