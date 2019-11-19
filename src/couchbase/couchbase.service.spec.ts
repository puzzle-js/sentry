import { Test, TestingModule } from '@nestjs/testing';
import { CouchbaseService } from './couchbase.service';

describe('CouchbaseService', () => {
  let service: CouchbaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouchbaseService],
    }).compile();

    service = module.get<CouchbaseService>(CouchbaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
