import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '../types';

import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';

describe('CommentResolver', () => {
  let resolver: CommentResolver;
  let service: CommentService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [CommentResolver, CommentService],
    }).compile();

    resolver = moduleRef.get<CommentResolver>(CommentResolver);
    service = moduleRef.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('resolver create comment', async () => {
    const result = Promise.resolve(new Comment());
    jest.spyOn(service, 'create').mockImplementation(() => result);

    const dto = { content: 'just a test content.', courseId: 1 };

    expect(
      await resolver.createComment(dto, {
        email: 'test@test.com',
        role: UserRole.CUSTOMER,
        sub: 1,
      }),
    ).toBe(result);
  });
});
