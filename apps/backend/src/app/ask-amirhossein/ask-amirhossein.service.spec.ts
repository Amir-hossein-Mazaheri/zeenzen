import { Test, TestingModule } from '@nestjs/testing';
import { AskAmirhosseinService } from './ask-amirhossein.service';

describe('AskAmirhosseinService', () => {
  let service: AskAmirhosseinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AskAmirhosseinService],
    }).compile();

    service = module.get<AskAmirhosseinService>(AskAmirhosseinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
