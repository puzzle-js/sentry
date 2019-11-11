import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { GatewayGateway } from './gateway/gateway.gateway';

@Module({
  imports: [GatewayModule],
})
export class AppModule {}
