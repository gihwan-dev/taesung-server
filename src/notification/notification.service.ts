import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.alarm_data.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.alarm_data.findMany({
      where: {
        di_idx: id,
      },
    });
  }

  async update(id: number, type: string, value: number) {
    switch (type) {
      case "collect":
        return await this.prisma.alarm_setting.update({
          where: {
            as_idx: id,
          },
          data: {
            as_collect: value,
          },
        });
      case "door":
        return await this.prisma.alarm_setting.update({
          where: {
            as_idx: id,
          },
          data: {
            as_door: value,
          },
        });
      case "ou":
        return await this.prisma.alarm_setting.update({
          where: {
            as_idx: id,
          },
          data: {
            as_ou: value,
          },
        });
      case "bat":
        return await this.prisma.alarm_setting.update({
          where: {
            as_idx: id,
          },
          data: {
            as_bat: value,
          },
        });
      default:
        return "잘못된 요청입니다.";
    }
  }
}
