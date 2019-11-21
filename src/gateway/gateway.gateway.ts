import {
  SubscribeMessage, WebSocketGateway, OnGatewayInit,
  OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Gateway } from './gateway.interface';
import { GatewayService } from './gateway.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

@WebSocketGateway()
export class GatewayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gatewayService: GatewayService) { }
  @WebSocketServer() server: Server;

  @SubscribeMessage('panel.gateways.get')
  async getForPanel() {
    const gateways = await this.gatewayService.get();
    return { event: 'panel.gateways', data: gateways };
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('panel.gateways.delete')
  async deleteForPanel(@MessageBody() body: {name: string}) {
    const deletionSuccessful = await this.gatewayService.delete(body.name);
    if (!deletionSuccessful) return;
    const gateways = await this.gatewayService.get();
    this.server.emit('panel.gateways', gateways);
    this.server.emit('gateway.delete', body.name);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('panel.gateways.add')
  async addForPanel(@MessageBody() gateway: Gateway) {
    delete (gateway as any).auth;
    await this.gatewayService.add(gateway);
    this.server.emit('panel.gateways', await this.gatewayService.get());
    this.server.emit('gateway.add', gateway);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('panel.gateways.update')
  async updateForPanel(@MessageBody() gateway: Gateway) {
    delete (gateway as any).auth;
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
