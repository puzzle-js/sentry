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
  async getForPanel() {
    const gateways = await this.gatewayService.get();
    return { event: 'panel.gateways', data: gateways };
  }

  @SubscribeMessage('panel.gateways.delete')
  async deleteForPanel(@MessageBody() name: string) {
    const deletionSuccessful = await this.gatewayService.delete(name);
    if (!deletionSuccessful) return;
    const gateways = await this.gatewayService.get();
    this.server.emit('panel.gateways', gateways);
    this.server.emit('gateway.delete', name);
  }

  @SubscribeMessage('panel.gateways.add')
  async addForPanel(@MessageBody() gateway: Gateway) {
    await this.gatewayService.add(gateway);
    this.server.emit('panel.gateways', await this.gatewayService.get());
    this.server.emit('gateway.add', gateway);
  }

  @SubscribeMessage('panel.gateways.update')
  async updateForPanel(@MessageBody() gateway: Gateway) {
    const updateSuccessful = await this.gatewayService.update(gateway);
    if (!updateSuccessful) return;
    this.server.emit('panel.gateways', await this.gatewayService.get());
    this.server.emit('gateway.update', gateway);
  }

  @SubscribeMessage('gateways.get')
  async get() {
    const gateways = await this.gatewayService.get();
    return { event: 'gateways', data: gateways };
  }

  afterInit(server: Server) {
    // console.log('gateway init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    // console.log(`gateway connected ${client.id} ${args}`);
  }

  handleDisconnect(client: Socket) {
    // console.log(`gateway disconnected ${client.id}`);
  }
}
