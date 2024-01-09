import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { DeviceService } from "./device.service";
import { UpdateDeviceNameDto } from "./dto/update-device.dto";

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

  @Patch(":id/name")
  async updateName(
    @Param("id") id: string,
    @Body() updateDeviceNameDto: UpdateDeviceNameDto,
  ) {
    return await this.deviceService.updateName(+id, updateDeviceNameDto);
  }

  @Patch(":id/ou")
  async updateOu(@Param("id") id, @Body() body) {
    return await this.deviceService.updateOu(+id, body.ou);
  }

  @Patch(":id/bat")
  async updateBat(@Param("id") id, @Body() body) {
    return await this.deviceService.updateBat(+id, body.bat);
  }

  @Patch(":id/maxOu")
  async updateMaxOu(@Param("id") id, @Body() body) {
    return await this.deviceService.updateMaxOu(+id, body.maxOu, body.delay);
  }
}
