import { Test, TestingModule } from '@nestjs/testing';
import { GatewayService } from '../gateway.service';
import { CouchbaseService } from '../../couchbase/couchbase.service';

describe('GatewayService', () => {
  let service: GatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewayService, CouchbaseService],
    }).compile();

    service = module.get<GatewayService>(GatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
