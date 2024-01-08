import { Module } from "@nestjs/common";
import { DeviceService } from "./device.service";
import { DeviceController } from "./device.controller";
import { PrismaService } from "src/prisma.service";
import { StateModule } from "./state/state.module";

@Module({
  controllers: [DeviceController],
  providers: [DeviceService, PrismaService],
  imports: [StateModule],
})
export class DeviceModule {}
