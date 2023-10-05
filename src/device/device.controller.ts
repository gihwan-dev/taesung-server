import { Controller, Get, Param } from "@nestjs/common";
import { DeviceService } from "./device.service";

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
