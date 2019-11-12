import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Fragment } from './fragment.interface';
import { FragmentService } from './fragment.service';

@WebSocketGateway()
export class FragmentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly fragmentService: FragmentService) { }
  @WebSocketServer() server: Server;

  @SubscribeMessage('fragments.get')
  get() {
    this.server.emit('fragments', this.fragmentService.get());
  }

  @SubscribeMessage('fragments.add')
  add(client: Socket, fragment: Fragment) {
    this.fragmentService.add(fragment);
    this.server.emit('fragments', this.fragmentService.get());
  }

  afterInit(server: Server) {
    console.log('fragment init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`fragment connected ${client.id} ${args}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`fragment disconnected ${client.id}`);
  }
}
