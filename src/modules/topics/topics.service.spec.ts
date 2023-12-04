import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { TopicsService } from './topics.service';
import { expect } from 'chai';
import { RootTestModule } from '../../root-test.module';

describe('TopicsService', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile();
  });

  let service: TopicsService;
  beforeEach(() => {
    service = module.get(TopicsService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
