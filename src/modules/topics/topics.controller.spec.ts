import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { TopicsController } from './topics.controller';
import { expect } from 'chai';

describe('TopicsController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [TopicsController],
    })
      .compile()
      .then((compiledModule) => (module = compiledModule));
  });

  let controller: TopicsController;
  beforeEach(() => {
    controller = module.get(TopicsController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
