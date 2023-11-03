import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { CommentsController } from './comments.controller';
import { expect } from 'chai';

describe('CommentsController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [CommentsController],
    })
      .compile()
      .then((compiledModule) => (module = compiledModule));
  });

  let controller: CommentsController;
  beforeEach(() => {
    controller = module.get(CommentsController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
