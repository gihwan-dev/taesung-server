import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DeviceService } from "./device.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";

@Controller("device")
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  async findAll() {
    return await this.deviceService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.deviceService.findOne(+id);
  }
}
