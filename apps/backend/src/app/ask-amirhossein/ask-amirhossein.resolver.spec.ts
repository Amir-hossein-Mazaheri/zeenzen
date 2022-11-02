import { Test, TestingModule } from '@nestjs/testing';
import { AskAmirhosseinResolver } from './ask-amirhossein.resolver';
import { AskAmirhosseinService } from './ask-amirhossein.service';

describe('AskAmirhosseinResolver', () => {
  let resolver: AskAmirhosseinResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AskAmirhosseinResolver, AskAmirhosseinService],
    }).compile();

    resolver = module.get<AskAmirhosseinResolver>(AskAmirhosseinResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
