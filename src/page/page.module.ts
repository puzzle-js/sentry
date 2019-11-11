import { Module } from '@nestjs/common';
import { PageGateway } from './page.gateway';
import { PageService } from './page.service';

@Module({
  providers: [PageGateway, PageService],
})
export class PageModule {}
