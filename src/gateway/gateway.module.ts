import { Module } from '@nestjs/common';
import { GatewayGateway } from './gateway.gateway';

@Module({
  providers: [GatewayGateway],
})
export class GatewayModule {}
