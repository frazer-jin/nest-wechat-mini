import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { LikesController } from './likes.controller';
import { expect } from 'chai';

describe('LikesController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [LikesController],
    })
      .compile()
      .then((compiledModule) => (module = compiledModule));
  });

  let controller: LikesController;
  beforeEach(() => {
    controller = module.get(LikesController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
