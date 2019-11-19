import { Test, TestingModule } from '@nestjs/testing';
import { GatewayGateway } from '../gateway.gateway';
import { GatewayService } from '../gateway.service';
import { CouchbaseService } from '../../couchbase/couchbase.service';

describe('GatewayGateway', () => {
  let gateway: GatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewayGateway, GatewayService, CouchbaseService],
    }).compile();

    gateway = module.get<GatewayGateway>(GatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
