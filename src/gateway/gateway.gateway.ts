import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Gateway } from './gateway.interface';

@WebSocketGateway()
export class GatewayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  gateways: Gateway[] = [];

  @SubscribeMessage('gateways.get')
  get() {
    this.server.emit('gateways', this.gateways);
  }

  @SubscribeMessage('gateways.add')
  add(client: Socket, payload: {gateway: Gateway}) {
    this.gateways.push(payload.gateway);
    this.server.emit('gateways', this.gateways);
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
