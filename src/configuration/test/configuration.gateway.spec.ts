import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationGateway } from '../configuration.gateway';
import { ConfigurationService } from '../configuration.service';
import { CouchbaseService } from '../../couchbase/couchbase.service';

describe('ConfigurationGateway', () => {
  let gateway: ConfigurationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationGateway, ConfigurationService, CouchbaseService],
    }).compile();

    gateway = module.get<ConfigurationGateway>(ConfigurationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
