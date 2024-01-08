import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    const sensorData = await this.prisma.sensor_data.findMany({
      where: {
        di_idx: id,
      },
      orderBy: {
        reg_date: "desc",
      },
    });
    return sensorData;
  }

  async findAll() {
    return await this.prisma.sensor_data.findMany();
  }
}
