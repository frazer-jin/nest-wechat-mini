import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { UsersController } from './users.controller';
import { expect } from 'chai';
import { RootTestModule } from '../../root-test.module';

describe('UsersController', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile();
  });

  let controller: UsersController;
  beforeEach(() => {
    controller = module.get(UsersController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
