import { Controller, Get, Param } from "@nestjs/common";
import { NotificationService } from "./notification.service";

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
}
