import {
  SubscribeMessage, WebSocketGateway, OnGatewayInit,
  OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Gateway } from './gateway.interface';
import { GatewayService } from './gateway.service';

@WebSocketGateway()
export class GatewayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gatewayService: GatewayService) { }
  @WebSocketServer() server: Server;

  @SubscribeMessage('panel.gateways.get')
  getForPanel() {
    const gateways = this.gatewayService.get();
    return { event: 'panel.gateways', data: gateways };
  }

  @SubscribeMessage('panel.gateways.delete')
  deleteForPanel(@MessageBody() name: string) {
    const deletionSuccessful = this.gatewayService.delete(name);
    if (!deletionSuccessful) return;
    const gateways = this.gatewayService.get();
    this.server.emit('panel.gateways', gateways);
    this.server.emit('gateways.delete', name);
  }

  @SubscribeMessage('panel.gateways.add')
  addForPanel(@MessageBody() fragment: Gateway) {
    this.gatewayService.add(fragment);
    this.server.emit('panel.gateways', this.gatewayService.get());
    this.server.emit('gateways.add', fragment);
  }

  @SubscribeMessage('panel.gateways.update')
  updateForPanel(@MessageBody() fragment: Gateway) {
    const updateSuccessful = this.gatewayService.update(fragment);
    if (!updateSuccessful) return;
    this.server.emit('panel.gateways', this.gatewayService.get());
    this.server.emit('gateways.update', fragment);
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
