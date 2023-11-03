import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { TopicsService } from './topics.service';
import { expect } from 'chai';

describe('TopicsService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      providers: [TopicsService],
    })
      .compile()
      .then((compiledModule) => (module = compiledModule));
  });

  let service: TopicsService;
  beforeEach(() => {
    service = module.get(TopicsService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
