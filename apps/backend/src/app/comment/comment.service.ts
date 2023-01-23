import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { RequestUser, UserRole } from '../types';
import validateEntity from '../utils/validateEntity';
import { CreateCommentInput } from './dto/create-comment.input';
import { ReplyCommentInput } from './dto/reply-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  getWhereOptions(id?: number, forUpdate = false) {
    return (user?: RequestUser) => {
      const whereOptions: Prisma.CommentWhereInput = {};

      if (id) {
        whereOptions.id = id;
      }

      if (forUpdate) {
        whereOptions.author = { id: user.sub };
      }

      if (user && user.role !== UserRole.ADMIN) {
        whereOptions.isPublished = true;
      }

      return whereOptions;
    };
  }

  validateComment(id: number, forUpdate?: boolean) {
    return (user?: RequestUser) =>
      (withDeleted = false) =>
      (relations: Prisma.CommentFindFirstArgs['include'] = {}) =>
      async (whereOptions?: Prisma.CommentWhereInput) => {
        const comment = await this.prismaService.comment.findFirst({
          where: {
            ...this.getWhereOptions(id, forUpdate)(user),
            ...whereOptions,
          },
          include: relations,
        });

        if (!comment) {
          throw new NotFoundException('Invalid comment id.');
        }

        return comment;
      };
  }

  async getAuthor(commentId: number) {
    return await this.prismaService.user.findFirst({
      where: {
        comments: {
          // TODO: I don't know what 'every' do fix it
          every: {
            id: commentId,
          },
        },
      },
    });
  }

  async getReplies(commentId: number) {
    return await this.prismaService.comment.findMany({
      where: {
        parentId: commentId,
        isPublished: true,
      },
    });
  }

  async create({ content, courseId }: CreateCommentInput, user: RequestUser) {
    return await this.prismaService.comment.create({
      data: {
        content,
        course: {
          connect: { id: courseId },
        },
        author: {
          connect: {
            id: user.sub,
          },
        },
      },
    });
  }

  //! Note: return all a single course related published comments or all comments if user is admin
  async findAll(courseId: number) {
    return await this.prismaService.comment.findMany({
      where: {
        ...this.getWhereOptions()(),
        course: { id: courseId },
        parentId: {
          not: null,
        },
        isPublished: true,
      },
    });
  }

  async findOne(id: number, user: RequestUser) {
    return await this.validateComment(id)(user)()()({ isPublished: true });
  }

  async update(
    id: number,
    updateCommentInput: UpdateCommentInput,
    user: RequestUser
  ) {
    await this.validateComment(id, true)(user)()()();

    return await this.prismaService.comment.update({
      where: {
        id,
      },
      data: updateCommentInput,
    });
  }

  async reply({ content, parentId }: ReplyCommentInput, user: RequestUser) {
    const parentComment = await this.validateComment(parentId)()()({
      course: true,
    })({ replies: { every: { NOT: null } } });

    validateEntity(parentComment, 'comment');

    return await this.prismaService.comment.create({
      data: {
        content,
        // parentId: parentComment.id,
        replies: {
          connect: {
            id: parentComment.id,
          },
        },
        course: {
          connect: {
            id: parentComment.courseId,
          },
        },
        author: {
          connect: {
            id: user.sub,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.validateComment(id)()()()();

    // TODO: make it soft delete
    return await this.prismaService.comment.delete({
      where: {
        id,
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      softDelete: true,
    });
  }

  async restore(id: number) {
    //
  }
}
