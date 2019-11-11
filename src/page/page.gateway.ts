import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Page } from './page.interface';

@WebSocketGateway()
export class PageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  pages: Page[] = [];

  @SubscribeMessage('pages.get')
  get() {
    this.server.emit('pages', this.pages);
  }

  @SubscribeMessage('pages.add')
  add(client: Socket, payload: { page: Page }) {
    console.log("payload page", payload.page)
    this.pages.push(payload.page);
    this.server.emit('pages', this.pages);
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
