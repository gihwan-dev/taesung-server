import { Controller, Patch, Param } from "@nestjs/common";
import { ReadService } from "./read.service";

@Controller("notification/read")
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @Patch(":id")
  async update(@Param("id") id: string) {
    return await this.readService.update(+id);
  }
}
