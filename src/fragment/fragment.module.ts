import { Module } from '@nestjs/common';
import { FragmentGateway } from './fragment.gateway';
import { FragmentService } from './fragment.service';

@Module({
  providers: [FragmentGateway, FragmentService],
})
export class FragmentModule {}
