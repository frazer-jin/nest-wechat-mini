import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { LikesController } from './likes.controller';
import { expect } from 'chai';
import { RootTestModule } from '../../root-test.module';

describe('LikesController', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile();
  });

  let controller: LikesController;
  beforeEach(() => {
    controller = module.get(LikesController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
