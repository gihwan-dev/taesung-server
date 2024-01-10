import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UpdateDeviceNameDto } from "./dto/update-device.dto";

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.device_info.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.device_state.findFirst({
      where: {
        di_idx: id,
      },
    });
  }

  async updateName(id: number, updateDeviceNameDto: UpdateDeviceNameDto) {
    const result = await this.prisma.device_info.update({
      where: {
        di_idx: id,
      },
      data: {
        di_name: updateDeviceNameDto.name,
      },
    });

    if (!result) {
      throw new NotFoundException();
    }

    return "성공적으로 수정되었습니다.";
  }

  async updateOu(id: number, ou: number) {
    const result = await this.prisma.alarm_setting.update({
      where: {
        as_idx: id,
      },
      data: {
        as_ouSet: ou,
      },
    });
    if (!result) {
      throw new NotFoundException();
    }
    return "성공적으로 수정되었습니다.";
  }

  async updateBat(id: number, bat: number) {
    const result = await this.prisma.alarm_setting.update({
      where: {
        as_idx: id,
      },
      data: {
        as_batSet: bat,
      },
    });
    if (!result) {
      throw new NotFoundException();
    }
    return "성공적으로 수정되었습니다.";
  }

  async updateMaxOu(id: number, maxOu: number, delay: number) {
    const result = await this.prisma.device_setting.update({
      where: {
        des_idx: id,
      },
      data: {
        des_delayTime: delay,
        des_ouOver: maxOu,
      },
    });
    if (!result) {
      throw new NotFoundException();
    }

    return "성공적으로 수정되었습니다.";
  }
}
