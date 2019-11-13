import {
  SubscribeMessage, WebSocketGateway, OnGatewayInit,
  OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Page } from './page.interface';
import { PageService } from './page.service';

@WebSocketGateway()
export class PageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly pageService: PageService) { }
  @WebSocketServer() server: Server;

  @SubscribeMessage('panel.pages.get')
  getForPanel() {
    const pages = this.pageService.get();
    return { event: 'panel.pages', pages };
  }

  @SubscribeMessage('panel.pages.delete')
  deleteForPanel(@MessageBody() name: string) {
    const deletionSuccessful = this.pageService.delete(name);
    if (!deletionSuccessful) return;
    const pages = this.pageService.get();
    this.server.emit('panel.pages', pages);
    this.server.emit('pages.delete', name);
  }

  @SubscribeMessage('panel.pages.add')
  addForPanel(@MessageBody() page: Page) {
    this.pageService.add(page);
    this.server.emit('panel.pages', this.pageService.get());
    this.server.emit('pages.add', page);
  }

  @SubscribeMessage('panel.pages.update')
  updateForPanel(@MessageBody() page: Page) {
    const updateSuccessful = this.pageService.update(page);
    if (!updateSuccessful) return;
    this.server.emit('panel.pages', this.pageService.get());
    this.server.emit('pages.update', page);
  }

  @SubscribeMessage('pages.get')
  get() {
    const pages = this.pageService.get();
    return { event: 'pages', data: pages };
  }

  afterInit(server: Server) {
    console.log('page init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`page connected ${client.id} ${args}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`page disconnected ${client.id}`);
  }
}
