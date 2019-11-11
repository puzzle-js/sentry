import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { GatewayGateway } from './gateway/gateway.gateway';
import { PageModule } from './page/page.module';
import { PageGateway } from './page/page.gateway';

@Module({
  imports: [GatewayModule, PageModule],
})
export class AppModule {}
