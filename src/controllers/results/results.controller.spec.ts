import { Test, TestingModule } from '@nestjs/testing';
import { ResultsController } from './results.controller';

describe('Results Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ResultsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ResultsController = module.get<ResultsController>(ResultsController);
    expect(controller).toBeDefined();
  });
});
