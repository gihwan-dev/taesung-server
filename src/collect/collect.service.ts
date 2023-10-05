import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CollectService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    return await this.prisma.collect_code.findFirst({
      where: {
        cc_idx: id,
      },
    });
  }
}
