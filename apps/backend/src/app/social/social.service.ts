import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Instructor } from '../instructor/entities/instructor.entity';
import { toCamelCase } from '../utils/toCamelCase';
import { CreateSocialInput } from './dto/create-social.input';
import { UpdateSocialInput } from './dto/update-social.input';
import { Social } from './entities/social.entity';

@Injectable()
export class SocialService {
  private relations = ['instructor'];

  constructor(
    @InjectRepository(Social) private socialRepository: Repository<Social>,
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
    private dataSource: DataSource
  ) {}

  async validateSocial(id: number) {
    const social = await this.socialRepository.findOne({
      where: { id },
      relations: this.relations,
    });

    if (!social) {
      throw new BadRequestException('Invalid social id.');
    }

    return social;
  }

  validateInstructor(instructorId: number, social: Social) {
    if (social.instructor.id !== instructorId) {
      throw new ForbiddenException("You can't modify this social.");
    }
  }

  async create({ link, type }: CreateSocialInput, instructorId: number) {
    const instructor = await this.instructorRepository.findOneBy({
      id: instructorId,
    });

    const newSocial = new Social();
    newSocial.type = type;
    newSocial.link = link;
    newSocial.instructor = instructor;

    await this.socialRepository.manager.save(newSocial);

    return newSocial;
  }

  async findAll() {
    return await this.socialRepository.find({ relations: this.relations });
  }

  async findOne(id: number) {
    return await this.validateSocial(id);
  }

  async update(
    id: number,
    updateSocialInput: UpdateSocialInput,
    instructorId: number
  ) {
    const social = await this.validateSocial(id);

    this.validateInstructor(instructorId, social);

    const updatedSocial = await this.dataSource
      .createQueryBuilder()
      .update<Social>(Social)
      .set(updateSocialInput)
      .where({ id })
      .returning('*')
      .execute();

    return toCamelCase(updatedSocial.raw[0]);
  }

  async remove(id: number, instructorId: number) {
    const social = await this.validateSocial(id);

    this.validateInstructor(instructorId, social);

    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Social)
      .where({ id })
      .execute();

    return social;
  }
}
