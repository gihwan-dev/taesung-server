import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.device_info.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.device_state.findFirst({
      where: {
        di_idx: id,
      },
    });
  }
}
