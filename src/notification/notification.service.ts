import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.alarm_data.findMany();
  }
}
