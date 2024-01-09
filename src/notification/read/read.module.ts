import { Module } from "@nestjs/common";
import { ReadService } from "./read.service";
import { ReadController } from "./read.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [ReadController],
  providers: [ReadService, PrismaService],
})
export class ReadModule {}
