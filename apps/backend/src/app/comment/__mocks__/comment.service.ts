import { createMockContext } from '@zeenzen/database';

import { RequestUser } from '../../types';
import { CreateCommentInput } from '../dto/create-comment.input';

export const CommentService = jest.fn().mockReturnValue({
  create: jest
    .fn()
    .mockImplementation(
      async ({ courseId, content }: CreateCommentInput, user: RequestUser) =>
        createMockContext().prisma.comment.create.mockResolvedValue({
          id: 1,
          content,
          updatedAt: new Date(),
          createdAt: new Date(),
          isPublished: false,
          courseId,
          authorId: user.sub,
          parentId: null,
          deletedAt: null,
        })
    ),
});
