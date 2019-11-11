import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Gateway } from './gateway.interface';
import { GatewayService } from './gateway.service';

@WebSocketGateway()
export class GatewayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gatewayService: GatewayService) { }
  @WebSocketServer() server: Server;

  @SubscribeMessage('gateways.get')
  get() {
    this.server.emit('gateways', this.gatewayService.get());
  }

  @SubscribeMessage('gateways.add')
  add(client: Socket, payload: {gateway: Gateway}) {
    this.gatewayService.add(payload.gateway);
    this.server.emit('gateways', this.gatewayService.get());
  }

  afterInit(server: Server) {
    console.log('gateway init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`gateway connected ${client.id} ${args}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`gateway disconnected ${client.id}`);
  }
}
