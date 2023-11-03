import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { CommentsService } from './comments.service';
import { expect } from 'chai';

describe('CommentsService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      providers: [CommentsService],
    })
      .compile()
      .then((compiledModule) => (module = compiledModule));
  });

  let service: CommentsService;
  beforeEach(() => {
    service = module.get(CommentsService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
