import { BadGatewayException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Socket, Server } from "socket.io";
import * as serviceAccount from "./serviceAccountKey.json";
import * as admin from "firebase-admin";
import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api";
import {
  CreateSensorDataDto,
  CreateWeatherDataDto,
  UpdateDeviceStateDto,
} from "./dto/update-w.dto";

@Injectable()
export class WsService {
  #app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
  constructor(private prisma: PrismaService) {}
  async getDeviceState(id: number, client: Socket) {
    const deviceState = await this.prisma.device_state.findFirst({
      where: {
        di_idx: id,
      },
    });
    client.emit(`get-device-state-${id}`, deviceState);
  }

  async init(id: number, client: Socket) {
    const deviceState = await this.prisma.device_state.findFirst({
      where: {
        di_idx: id,
      },
    });

    const weatherData = await this.prisma.weather_data.findFirst({
      where: {
        di_idx: id,
      },
    });

    const sensorData = await this.prisma.sensor_data.findFirst({
      where: {
        di_idx: id,
      },
    });

    client.emit(`device_state_${id}`, deviceState);
    client.emit(`weather_data_${id}`, weatherData);
    client.emit(`sensor_data_${id}`, sensorData);
  }

  async updateDeviceState(body: UpdateDeviceStateDto, client: Server) {
    const prevState = await this.prisma.device_state.findFirst({
      where: {
        ds_idx: +body.ds_idx,
      },
    });

    const result = await this.prisma.device_state.update({
      where: {
        ds_idx: +body.di_idx,
      },
      data: {
        ds_collect: +body.ds_collect,
        ds_stop: +body.ds_stop,
        ds_bat: +body.ds_bat,
        ds_door: +body.ds_door,
        ds_remoteCollect: +body.ds_remoteCollect,
        mod_date: new Date(),
      },
    });

    const users = await this.prisma.user_device.findMany();

    if (!result) {
      throw new BadGatewayException();
    }

    client.emit(`device_state_${result.di_idx}`, result);

    if (this.isDoorOpen(result.ds_door)) {
      const message: MulticastMessage = {
        tokens: users.map(user => user.token),
        notification: {
          title: "문이 열렸습니다.",
          body: "문이 열렸습니다.",
        },
      };
      this.#app.messaging().sendEachForMulticast(message);
    }

    if (await this.isRowBat(result.di_idx, result.ds_bat)) {
      const message: MulticastMessage = {
        tokens: users.map(user => user.token),
        notification: {
          title: "배터리가 부족합니다.",
          body: "배터리가 부족합니다.",
        },
      };
      this.#app.messaging().sendEachForMulticast(message);
    }

    if (this.isCollectStart(prevState.ds_collect, result.ds_collect)) {
      const message: MulticastMessage = {
        tokens: users.map(user => user.token),
        notification: {
          title: "포집이 시작되었습니다.",
          body: "포집이 시작되었습니다.",
        },
      };
      this.#app.messaging().sendEachForMulticast(message);
    }

    if (this.isCollectComplete(result.ds_collect)) {
      const message: MulticastMessage = {
        tokens: users.map(user => user.token),
        notification: {
          title: "포집이 완료되었습니다.",
          body: "포집이 완료되었습니다.",
        },
      };
      this.#app.messaging().sendEachForMulticast(message);
    }
  }

  async createSensorData(body: CreateSensorDataDto, client: Server) {
    const result = await this.prisma.sensor_data.create({
      data: {
        di_idx: +body.di_idx,
        sd_mos: +body.sd_mos,
        sd_ou: +body.sd_ou,
        reg_date: new Date(),
      },
    });

    const deviceSetting = await this.prisma.alarm_setting.findFirst({
      where: {
        di_idx: +body.di_idx,
      },
    });

    const users = await this.prisma.user_device.findMany();

    if (!result) {
      throw new BadGatewayException();
    }

    client.emit(`sensor_data_${body.di_idx}`, result);
    if (result.sd_ou >= deviceSetting.as_ouSet) {
      const message: MulticastMessage = {
        tokens: users.map(user => user.token),
        notification: {
          title: "복합악취 수치를 초과했습니다.",
          body: "복합악취 수치를 초과했습니다.",
        },
      };
      this.#app.messaging().sendEachForMulticast(message);
    }
  }

  async createWeatherData(body: CreateWeatherDataDto, client: Server) {
    const result = await this.prisma.weather_data.create({
      data: {
        di_idx: +body.di_idx,
        wd_temp: +body.wd_temp,
        wd_humi: +body.wd_humi,
        wd_wdd: +body.wd_wdd,
        wd_wds: +body.wd_wds,
        reg_date: new Date(),
      },
    });
    client.emit(`weather_data_${body.di_idx}`, result);
  }

  isDoorOpen(door: number) {
    if (door === 1) {
      return true;
    } else {
      return false;
    }
  }

  async isRowBat(di_idx: number, bat: number) {
    const result = await this.prisma.alarm_setting.findFirst({
      where: {
        di_idx,
      },
    });

    if (bat <= result.as_batSet) {
      return true;
    } else {
      return false;
    }
  }

  isCollectStart(prev_di_collect: number, cur_di_collect: number) {
    return prev_di_collect === 1 && cur_di_collect === 2;
  }

  isCollectComplete(di_collect: number) {
    return di_collect === 5;
  }
}
