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
  async getForPanel() {
    const pages = await this.pageService.get();
    return { event: 'panel.pages', data: pages };
  }

  @SubscribeMessage('panel.pages.delete')
  async deleteForPanel(@MessageBody() body: { name: string }) {
    if (!body.name) return;
    const deletionSuccessful = await this.pageService.delete(body.name);
    if (!deletionSuccessful) return;
    const pages = await this.pageService.get();
    this.server.emit('panel.pages', pages);
    this.server.emit('page.delete', body.name);
  }

  @SubscribeMessage('panel.pages.add')
  async addForPanel(@MessageBody() page: Page) {
    if (!page.name) return;
    await this.pageService.add(page);
    this.server.emit('panel.pages', await this.pageService.get());
    this.server.emit('page.update', page);
  }

  @SubscribeMessage('panel.pages.update')
  async updateForPanel(@MessageBody() page: Page) {
    if (!page.name) return;
    const updateSuccessful = await this.pageService.update(page);
    if (!updateSuccessful) return;
    this.server.emit('panel.pages', await this.pageService.get());
    this.server.emit('page.update', page);
  }

  @SubscribeMessage('pages.get')
  async get() {
    const pages = await this.pageService.get();
    return { event: 'pages', data: pages };
  }

  afterInit(server: Server) {
    // console.log('page init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    // console.log(`page connected ${client.id} ${args}`);
  }

  handleDisconnect(client: Socket) {
    // console.log(`page disconnected ${client.id}`);
  }
}
