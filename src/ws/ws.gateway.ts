import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { WsService } from "./ws.service";
import { CreateWDto } from "./dto/create-w.dto";
import { UpdateWDto } from "./dto/update-w.dto";
import { Socket } from "dgram";

@WebSocketGateway({ cors: { origin: "*" } })
export class WsGateway {
  constructor(private readonly wsService: WsService) {}

  @SubscribeMessage("createW")
  create(
    @MessageBody() createWDto: CreateWDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log("createWDto", createWDto);
    console.log("client", client);
    client.emit("message", "Hello from server");
    return this.wsService.create(createWDto);
  }

  @SubscribeMessage("findAllWs")
  findAll() {
    return this.wsService.findAll();
  }

  @SubscribeMessage("findOneW")
  findOne(@MessageBody() id: number) {
    return this.wsService.findOne(id);
  }

  @SubscribeMessage("updateW")
  update(@MessageBody() updateWDto: UpdateWDto) {
    return this.wsService.update(updateWDto.id, updateWDto);
  }

  @SubscribeMessage("removeW")
  remove(@MessageBody() id: number) {
    return this.wsService.remove(id);
  }
}
