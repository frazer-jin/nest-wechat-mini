import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { LikesService } from './likes.service';
import { expect } from 'chai';

describe('LikesService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      providers: [LikesService],
    })
      .compile()
      .then((compiledModule) => (module = compiledModule));
  });

  let service: LikesService;
  beforeEach(() => {
    service = module.get(LikesService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
