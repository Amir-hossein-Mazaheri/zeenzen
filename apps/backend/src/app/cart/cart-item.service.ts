import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Course } from '../course/entities/course.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly dataSource: DataSource
  ) {}

  async getCourse(cartItemId: number) {
    return await this.courseRepository.findOneBy({
      cartItems: { id: cartItemId },
    });
  }
}
