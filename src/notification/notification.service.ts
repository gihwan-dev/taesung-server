import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import * as serviceAccount from "./serviceAccountKey.json";
import * as admin from "firebase-admin";
import { Message } from "firebase-admin/lib/messaging/messaging-api";

@Injectable()
export class NotificationService {
  #app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
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

  async pushNotificationTest(ip: string) {
    const userDevice = await this.prisma.user_device.findUnique({
      where: {
        ip: ip,
      },
    });

    const token = userDevice.token;

    const message: Message = {
      data: {
        title: "테스트 알림",
        body: "테스트 알립 입니다.",
      },
      token,
    };
    const result = await admin.messaging().send(message);
    console.log(result);
  }
}
