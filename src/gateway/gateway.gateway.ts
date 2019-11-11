import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class GatewayGateway {
  @SubscribeMessage('getInfo')
  getInfo(client: any, payload: any): string {
    return 'Hello world!';
  }
}
