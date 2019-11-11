import { Test, TestingModule } from '@nestjs/testing';
import { PageGateway } from './page.gateway';

describe('PageGateway', () => {
  let gateway: PageGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageGateway],
    }).compile();

    gateway = module.get<PageGateway>(PageGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
