import { Controller, Get, Param } from "@nestjs/common";
import { DeviceService } from "./device.service";

@Controller("setting/device")
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.deviceService.findOne(+id);
  }
}
