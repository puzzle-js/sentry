import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { PageModule } from './page/page.module';
import { FragmentModule } from './fragment/fragment.module';

@Module({
  imports: [GatewayModule, PageModule, FragmentModule],
})
export class AppModule {}
