import { Injectable } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    return await this.prisma.alarm_setting.findFirst({
      where: {
        di_idx: id,
      },
    });
  }
}
