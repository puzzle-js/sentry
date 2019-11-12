import { Test, TestingModule } from '@nestjs/testing';
import { FragmentGateway } from '../fragment.gateway';

describe('FragmentGateway', () => {
  let gateway: FragmentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FragmentGateway],
    }).compile();

    gateway = module.get<FragmentGateway>(FragmentGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
