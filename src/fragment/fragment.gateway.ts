import {
  SubscribeMessage, WebSocketGateway, OnGatewayInit,
  OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Fragment } from './fragment.interface';
import { FragmentService } from './fragment.service';

@WebSocketGateway()
export class FragmentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly fragmentService: FragmentService) { }
  @WebSocketServer() server: Server;

  @SubscribeMessage('panel.fragments.get')
  getForPanel() {
    const fragments = this.fragmentService.get();
    return { event: 'panel.fragments', data: fragments };
  }

  @SubscribeMessage('panel.fragments.delete')
  deleteForPanel(@MessageBody() name: string) {
    const deletionSuccessful = this.fragmentService.delete(name);
    if (!deletionSuccessful) return;
    const fragments = this.fragmentService.get();
    this.server.emit('panel.fragments', fragments);
    this.server.emit('fragment.delete', name);
  }

  @SubscribeMessage('panel.fragments.add')
  addForPanel(@MessageBody() fragment: Fragment) {
    this.fragmentService.add(fragment);
    this.server.emit('panel.fragments', this.fragmentService.get());
    this.server.emit('fragment.add', fragment);
  }

  @SubscribeMessage('panel.fragments.update')
  updateForPanel(@MessageBody() fragment: Fragment) {
    const updateSuccessful = this.fragmentService.update(fragment);
    if (!updateSuccessful) return;
    this.server.emit('panel.fragments', this.fragmentService.get());
    this.server.emit('fragment.update', fragment);
  }

  @SubscribeMessage('fragments.get')
  get() {
    const fragments = this.fragmentService.get();
    return { event: 'fragments', data: fragments };
  }

  afterInit(server: Server) {
    // console.log('fragment init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    // console.log(`fragment connected ${client.id} ${args}`);
  }

  handleDisconnect(client: Socket) {
    // console.log(`fragment disconnected ${client.id}`);
  }
}
