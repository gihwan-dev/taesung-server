import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DeviceModule } from './device/device.module';
import { SensorModule } from './sensor/sensor.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, DeviceModule, SensorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
