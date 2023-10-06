import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    return await this.prisma.device_setting.findFirst({
      where: {
        di_idx: id,
      },
    });
  }
}
