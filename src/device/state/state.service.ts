import { Injectable } from "@nestjs/common";
import { CreateStateDto } from "./dto/create-state.dto";
import { UpdateStateDto } from "./dto/update-state.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}
  create(createStateDto: CreateStateDto) {
    return "This action adds a new state";
  }

  async findAll() {
    return await this.prisma.device_state.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} state`;
  }

  update(id: number, updateStateDto: UpdateStateDto) {
    return `This action updates a #${id} state`;
  }

  remove(id: number) {
    return `This action removes a #${id} state`;
  }

  async startCollect(id: number) {
    const result = await this.prisma.device_state.update({
      where: {
        ds_idx: id,
      },
      data: {
        ds_collect: 2,
        ds_stop: 0,
      },
    });

    return result;
  }

  async stopCollect(id: number) {
    const result = await this.prisma.device_state.update({
      where: {
        ds_idx: id,
      },
      data: {
        ds_stop: 1,
      },
    });

    return result;
  }

  async resetCollect(id: number) {
    const result = await this.prisma.device_state.update({
      where: {
        ds_idx: id,
      },
      data: {
        ds_collect: 1,
      },
    });

    return result;
  }

  async restartCollect(id: number) {
    const result = await this.prisma.device_state.update({
      where: {
        ds_idx: id,
      },
      data: {
        ds_stop: 0,
      },
    });

    return result;
  }
}
