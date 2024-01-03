import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    console.log(await this.prisma.alarm_data.findMany());
    return await this.prisma.alarm_data.findMany();
  }
}
