import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DeviceModule } from "./device/device.module";
import { SensorModule } from "./sensor/sensor.module";
import { CollectModule } from "./collect/collect.module";
import { WeatherModule } from "./weather/weather.module";
import { SettingModule } from "./setting/setting.module";
import { NotificationModule } from "./notification/notification.module";
import { WsModule } from "./ws/ws.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    DeviceModule,
    SensorModule,
    CollectModule,
    WeatherModule,
    SettingModule,
    NotificationModule,
    WsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client"),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
