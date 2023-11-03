import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { PetsController } from './pets.controller';
import { expect } from 'chai';

describe('PetsController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [PetsController],
    })
      .compile()
      .then((compiledModule) => (module = compiledModule));
  });

  let controller: PetsController;
  beforeEach(() => {
    controller = module.get(PetsController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
