import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { PrismaService } from "src/prisma.service";
import { ReadModule } from "./read/read.module";

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService],
  imports: [ReadModule],
})
export class NotificationModule {}
