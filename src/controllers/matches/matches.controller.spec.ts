import { Test, TestingModule } from '@nestjs/testing';
import { MatchesController } from './matches.controller';

describe('Matches Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MatchesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MatchesController = module.get<MatchesController>(MatchesController);
    expect(controller).toBeDefined();
  });
});
