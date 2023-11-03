import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { PetsService } from './pets.service';
import { expect } from 'chai';

describe('BooksService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      providers: [PetsService],
    })
      .compile()
      .then((compiledModule) => (module = compiledModule));
  });

  let service: PetsService;
  beforeEach(() => {
    service = module.get(PetsService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
