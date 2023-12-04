import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { expect } from 'chai';
import { RootTestModule } from '../../root-test.module';

describe('CommentsService', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile();
  });

  let service: CommentsService;
  beforeEach(() => {
    service = module.get<CommentsService>(CommentsService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
