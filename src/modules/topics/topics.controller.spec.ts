import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { TopicsController } from './topics.controller';
import { expect } from 'chai';
import { RootTestModule } from '../../root-test.module';

describe('TopicsController', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile();
  });

  let controller: TopicsController;
  beforeEach(() => {
    controller = module.get(TopicsController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
