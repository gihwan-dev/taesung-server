import { Controller, Get, Param } from "@nestjs/common";
import { SensorService } from "./sensor.service";

@Controller("sensor")
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.sensorService.findOne(+id);
  }

  @Get()
  async findAll() {
    return await this.sensorService.findAll();
  }
}
