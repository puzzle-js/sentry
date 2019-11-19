import { Test, TestingModule } from '@nestjs/testing';
import { PageService } from '../page.service';
import { CouchbaseService } from '../../couchbase/couchbase.service';

describe('PageService', () => {
  let service: PageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageService, CouchbaseService],
    }).compile();

    service = module.get<PageService>(PageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
