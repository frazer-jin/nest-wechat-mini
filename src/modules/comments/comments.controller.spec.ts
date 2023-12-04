import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { CommentsController } from './comments.controller';
import { expect } from 'chai';
import { RootTestModule } from '../../root-test.module';

describe('CommentsController', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile();
  });

  let controller: CommentsController;
  beforeEach(() => {
    controller = module.get(CommentsController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
