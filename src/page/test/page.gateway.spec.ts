import { Test, TestingModule } from '@nestjs/testing';
import { PageGateway } from '../page.gateway';
import { PageService } from '../page.service';

describe('PageGateway', () => {
  let gateway: PageGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageGateway, PageService],
    }).compile();

    gateway = module.get<PageGateway>(PageGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
