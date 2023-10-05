import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class WeatherService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    return await this.prisma.weather_data.findFirst({
      where: {
        di_idx: id,
      },
      orderBy: {
        wd_idx: "desc",
      },
    });
  }
}
