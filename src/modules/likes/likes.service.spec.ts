import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { LikesService } from './likes.service';
import { expect } from 'chai';
import { RootTestModule } from '../../root-test.module';

describe('LikesService', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile();
  });

  let service: LikesService;
  beforeEach(() => {
    service = module.get(LikesService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
