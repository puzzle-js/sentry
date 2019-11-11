import { Module } from '@nestjs/common';
import { PageGateway } from './page.gateway';

@Module({
  providers: [PageGateway],
})
export class PageModule {}
