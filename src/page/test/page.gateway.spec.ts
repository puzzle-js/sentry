import { Test, TestingModule } from '@nestjs/testing';
import { PageGateway } from '../page.gateway';
import { PageService } from '../page.service';
import { CouchbaseService } from '../../couchbase/couchbase.service';

describe('PageGateway', () => {
  let gateway: PageGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageGateway, PageService, CouchbaseService],
    }).compile();

    gateway = module.get<PageGateway>(PageGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
