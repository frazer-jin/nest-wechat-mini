import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { PetsController } from './pets.controller';
import { expect } from 'chai';
import { RootTestModule } from '../../root-test.module';

describe('PetsController', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile();
  });

  let controller: PetsController;
  beforeEach(() => {
    controller = module.get(PetsController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
