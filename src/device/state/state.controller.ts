import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { StateService } from "./state.service";
import { CreateStateDto } from "./dto/create-state.dto";

@Controller("device/state")
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Get()
  findAll() {
    return this.stateService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.stateService.findOne(+id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Query("type") type) {
    switch (type) {
      case "start":
        return await this.stateService.startCollect(+id);
      case "stop":
        return await this.stateService.stopCollect(+id);
      case "reset":
        return await this.stateService.resetCollect(+id);
      case "restart":
        return await this.stateService.restartCollect(+id);
    }
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.stateService.remove(+id);
  }
}
