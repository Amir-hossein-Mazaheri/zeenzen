import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  Repository,
} from 'typeorm';

import { CourseService } from '../course/course.service';
import { Course } from '../course/entities/course.entity';
import { RequestUser, UserRole } from '../types';
import { User } from '../user/entities/user.entity';
import { toCamelCase } from '../utils/toCamelCase';
import validateEntity from '../utils/validateEntity';
import { CreateCommentInput } from './dto/create-comment.input';
import { ReplyCommentInput } from './dto/reply-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
    private courseService: CourseService,
    private readonly prismaService: PrismaService
  ) {}

  getWhereOptions(id?: number, forUpdate = false) {
    return (user?: RequestUser) => {
      const whereOptions: Prisma.CommentWhereInput = {};

      if (id) {
        whereOptions.id = id;
      }

      if (forUpdate) {
        whereOptions.user = { id: user.sub };
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
      (relations: FindOptionsRelations<Comment> = {}) =>
      async (whereOptions?: Prisma.CommentWhereInput) => {
        // const comment = await this.commentRepository.findOne({
        //   where: {
        //     ...this.getWhereOptions(id, forUpdate)(user),
        //     ...whereOptions,
        //   },
        //   relations: { ...this.relations, ...relations },
        //   withDeleted,
        // });

        const comment = await this.prismaService.comment.findFirst({
          where: {
            ...this.getWhereOptions(id, forUpdate)(user),
            ...whereOptions,
          },
        });

        if (!comment) {
          throw new NotFoundException('Invalid comment id.');
        }

        return comment;
      };
  }

  async getAuthor(commentId: number) {
    // const a = await this.userRepository.findOneBy({
    //   comments: { id: commentId },
    // });

    // console.log('a is: ', a);

    // return a;
    return await this.prismaService.user.findFirst({
      where: {
        comment: {
          // TODO: I don't know what some do fix it
          some: {
            id: commentId,
          },
        },
      },
    });
  }

  async getReplies(commentId: number) {
    // return await this.commentRepository.findBy({
    //   parent: { id: commentId },
    //   isPublished: true,
    // });
    return await this.prismaService.comment.findMany({
      where: {
        parentId: commentId,
        isPublished: true,
      },
    });
  }

  async create({ content, courseId }: CreateCommentInput, user: RequestUser) {
    // const course = await this.courseService.validateCourse(+courseId);

    // const course = await this.courseRepository.findOneBy({ id: courseId });
    // const currUser = await this.userRepository.findOneBy({ id: user.sub });

    // const newComment = new Comment();
    // newComment.content = content;
    // newComment.course = course;
    // newComment.author = currUser;

    // await this.commentRepository.manager.save(newComment);

    // return newComment;

    return await this.prismaService.comment.create({
      data: {
        content,
        course: {
          connect: { id: courseId },
        },
        user: {
          connect: {
            id: user.sub,
          },
        },
      },
    });
  }

  //! Note: return all a single course related published comments or all comments if user is admin
  async findAll(courseId: number) {
    // return await this.commentRepository.find({
    //   where: {
    //     ...this.getWhereOptions()(),
    //     course: { id: courseId },
    //     parent: IsNull(),
    //     isPublished: true,
    //   },
    //   relations: this.relations,
    // });

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

    // const comment = await this.dataSource
    //   .createQueryBuilder()
    //   .update(Comment)
    //   .set(updateCommentInput)
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(comment);

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
    })({ comment: { NOT: null } });

    validateEntity(parentComment, 'comment');

    // const currUser = await this.userRepository.findOneBy({ id: user.sub });

    // const newReply = new Comment();
    // newReply.content = content;
    // newReply.parent = parentComment;
    // newReply.course = parentComment.course;
    // newReply.author = currUser;

    // await this.commentRepository.manager.save(newReply);

    // return newReply;

    return await this.prismaService.comment.create({
      data: {
        content,
        // parentId: parentComment.id,
        comment: {
          connect: {
            id: parentComment.id,
          },
        },
        course: {
          connect: {
            id: parentComment.courseId,
          },
        },
        user: {
          connect: {
            id: user.sub,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.validateComment(id)()()()();

    // await this.commentRepository
    //   .createQueryBuilder()
    //   .softDelete()
    //   .where({ id })
    //   .execute();

    // return comment;

    // TODO: make it soft delete
    return await this.prismaService.comment.delete({
      where: {
        id,
      },
    });
  }

  async restore(id: number) {
    const comment = await this.validateComment(id)()(true)()();

    await this.commentRepository
      .createQueryBuilder()
      .restore()
      .where({ id })
      .execute();

    return comment;
  }
}
