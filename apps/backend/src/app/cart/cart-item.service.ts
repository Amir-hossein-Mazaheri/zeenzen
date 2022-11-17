import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from '@zeenzen/database';
import { DataSource, Repository } from 'typeorm';

import { Course } from '../course/entities/course.entity';

@Injectable()
export class CartItemService {
  constructor(
    // @InjectRepository(Course)
    // private readonly courseRepository: Repository<Course>,
    // private readonly dataSource: DataSource,
    private readonly prismaService: PrismaService
  ) {}

  async getCourse(cartItemId: number) {
    // return await this.courseRepository.findOneBy({
    //   cartItems: { id: cartItemId },
    // });

    return await this.prismaService.course.findFirst({
      where: {
        cartItems: {
          // TODO: I don't know about every check it later
          every: {
            id: cartItemId,
          },
        },
      },
    });
  }
}
