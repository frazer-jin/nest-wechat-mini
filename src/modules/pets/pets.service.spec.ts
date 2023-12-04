import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { PetsService } from './pets.service';
import { expect } from 'chai';
import { RootTestModule } from '../../root-test.module';

describe('PetsService', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile();
  });

  let service: PetsService;
  beforeEach(() => {
    service = module.get(PetsService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
