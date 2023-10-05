import { Controller, Get, Param } from "@nestjs/common";
import { CollectService } from "./collect.service";

@Controller("collect")
export class CollectController {
  constructor(private readonly collectService: CollectService) {}

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.collectService.findOne(+id);
  }
}
