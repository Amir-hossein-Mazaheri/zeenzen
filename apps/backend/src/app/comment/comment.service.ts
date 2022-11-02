import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
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
  private readonly relations: FindOptionsRelations<Comment> = {};

  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
    private courseService: CourseService
  ) {}

  getWhereOptions(id?: number, forUpdate = false) {
    return (user?: RequestUser) => {
      const whereOptions: FindOptionsWhere<Comment> = {};

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
      (relations: FindOptionsRelations<Comment> = {}) =>
      async (whereOptions?: FindOptionsWhere<Comment>) => {
        const comment = await this.commentRepository.findOne({
          where: {
            ...this.getWhereOptions(id, forUpdate)(user),
            ...whereOptions,
          },
          relations: { ...this.relations, ...relations },
          withDeleted,
        });

        if (!comment) {
          throw new NotFoundException('Invalid comment id.');
        }

        return comment;
      };
  }

  async getAuthor(commentId: number) {
    const a = await this.userRepository.findOneBy({
      comments: { id: commentId },
    });

    console.log('a is: ', a);

    return a;
  }

  async getReplies(commentId: number) {
    return await this.commentRepository.findBy({
      parent: { id: commentId },
      isPublished: true,
    });
  }

  async create({ content, courseId }: CreateCommentInput, user: RequestUser) {
    // const course = await this.courseService.validateCourse(+courseId);
    const course = await this.courseRepository.findOneBy({ id: courseId });
    const currUser = await this.userRepository.findOneBy({ id: user.sub });

    const newComment = new Comment();
    newComment.content = content;
    newComment.course = course;
    newComment.author = currUser;

    await this.commentRepository.manager.save(newComment);

    return newComment;
  }

  //! Note: return all a single course related published comments or all comments if user is admin
  async findAll(courseId: number) {
    return await this.commentRepository.find({
      where: {
        ...this.getWhereOptions()(),
        course: { id: courseId },
        parent: IsNull(),
        isPublished: true,
      },
      relations: this.relations,
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

    const comment = await this.dataSource
      .createQueryBuilder()
      .update(Comment)
      .set(updateCommentInput)
      .where({ id })
      .returning('*')
      .execute();

    return toCamelCase(comment);
  }

  async reply({ content, parentId }: ReplyCommentInput, user: RequestUser) {
    const parentComment = await this.validateComment(parentId)()()({
      course: true,
    })({ replies: IsNull() });

    validateEntity(parentComment, 'comment');

    const currUser = await this.userRepository.findOneBy({ id: user.sub });

    const newReply = new Comment();
    newReply.content = content;
    newReply.parent = parentComment;
    newReply.course = parentComment.course;
    newReply.author = currUser;

    await this.commentRepository.manager.save(newReply);

    return newReply;
  }

  async remove(id: number) {
    const comment = await this.validateComment(id)()()()();

    await this.commentRepository
      .createQueryBuilder()
      .softDelete()
      .where({ id })
      .execute();

    return comment;
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
