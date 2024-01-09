import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ReadService {
  constructor(private prisma: PrismaService) {}
  async update(id: number) {
    const result = await this.prisma.alarm_data.updateMany({
      where: {
        ac_idx: id,
      },
      data: {
        al_checked: 1,
      },
    });

    if (!result) {
      throw new NotFoundException("해당 알람을 찾을 수 없습니다.");
    }

    return "성공적으로 업데이트 했습니다.";
  }
}
