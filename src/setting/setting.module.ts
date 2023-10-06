import { Module } from "@nestjs/common";
import { SettingService } from "./setting.service";
import { SettingController } from "./setting.controller";
import { DeviceModule } from "./device/device.module";
import { NotificationModule } from "./notification/notification.module";

@Module({
  controllers: [SettingController],
  providers: [SettingService],
  imports: [DeviceModule, NotificationModule],
})
export class SettingModule {}
