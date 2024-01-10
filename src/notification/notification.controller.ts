import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
} from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { UpdateAlarmDto } from "./dto/update-notification.dto";
import { Request } from "express";

@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async findAll() {
    return await this.notificationService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id) {
    return await this.notificationService.findOne(+id);
  }

  @Get("test/push")
  async pushNotificationTest(@Req() req: Request) {
    const ip = req.ip || req.headers["x-forwarded-for"];
    return await this.notificationService.pushNotificationTest(ip as string);
  }

  @Patch(":id")
  async update(
    @Param("id") id,
    @Query("type") search,
    @Body() updateAlarmDto: UpdateAlarmDto,
  ) {
    const value = updateAlarmDto.value;
    return await this.notificationService.update(+id, search, value);
  }
}
