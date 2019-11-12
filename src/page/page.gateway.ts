import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Page } from './page.interface';
import { PageService } from './page.service';

@WebSocketGateway()
export class PageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly pageService: PageService) { }
  @WebSocketServer() server: Server;

  @SubscribeMessage('pages.get')
  get() {
    this.server.emit('pages', this.pageService.get());
  }

  @SubscribeMessage('pages.add')
  add(client: Socket, page: Page) {
    this.pageService.add(page);
    this.server.emit('pages', this.pageService.get());
  }

  afterInit(server: Server) {
    console.log('page init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`page connected ${client.id} ${args}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`page disconnected ${client.id}`)
  }
}
