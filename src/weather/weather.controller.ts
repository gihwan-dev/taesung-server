import { Controller, Get, Param } from "@nestjs/common";
import { WeatherService } from "./weather.service";

@Controller("weather")
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.weatherService.findOne(+id);
  }
}
