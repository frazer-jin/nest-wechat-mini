import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { UsersService } from './users.service';
import { expect } from 'chai';
import { RootTestModule } from '../../root-test.module';

describe('UsersService', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile();
  });

  let service: UsersService;
  beforeEach(() => {
    service = module.get(UsersService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
