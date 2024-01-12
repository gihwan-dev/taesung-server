import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { WsService } from "./ws.service";
import { Socket, Server } from "socket.io";
import {} from "./dto/update-w.dto";

@WebSocketGateway({ namespace: "/ws" })
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly wsService: WsService) {}

  handleConnection(client: Socket, ...args: any[]) {
    // 연결 처리
  }

  handleDisconnect(client: Socket) {
    // 연결 해제 처리
  }

  //설정
  @SubscribeMessage("get-device-state")
  async getDeviceState(@MessageBody() body, @ConnectedSocket() client: Socket) {
    const id = body;
    return await this.wsService.getDeviceState(+id, client);
  }

  @SubscribeMessage("init")
  async init(@MessageBody() body, @ConnectedSocket() client: Socket) {
    const id = body;

    console.log("init", id);
    return await this.wsService.init(+id, client);
  }

  @SubscribeMessage("set-device-state")
  async updateDeviceState(@MessageBody() body) {
    return await this.wsService.updateDeviceState(body, this.server);
  }

  @SubscribeMessage("set-sensor-data")
  async createSensorData(@MessageBody() body) {
    return await this.wsService.createSensorData(body, this.server);
  }

  @SubscribeMessage("set-weather-data")
  async createWeatherData(@MessageBody() body) {
    return await this.wsService.createWeatherData(body, this.server);
  }
}
