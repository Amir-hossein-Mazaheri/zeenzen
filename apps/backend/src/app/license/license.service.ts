import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';

import { Course } from '../course/entities/course.entity';
import { RequestUser, UserRole, CreateLicense } from '../types';
import { User } from '../user/entities/user.entity';
import { License } from './entities/license.entity';

@Injectable()
export class LicenseService {
  private readonly relations = ['courses', 'user'];

  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly httpService: HttpService
  ) {}

  getWhereOptions(user: RequestUser, id?: number) {
    const whereOptions: FindOptionsWhere<License> = {};

    if (id) {
      whereOptions.id = id;
    }

    if (user.role !== UserRole.ADMIN) {
      whereOptions.user = { id: user.sub };
    }

    return whereOptions;
  }

  async validateLicense(id: number, user: RequestUser) {
    const license = await this.licenseRepository.findOne({
      where: this.getWhereOptions(user, id),
      relations: this.relations,
    });

    if (!license) {
      throw new NotFoundException('Invalid license id.');
    }

    return license;
  }

  // create license flow:
  // 1. fetches all of courses in CreateLicense input
  // 2. request SpotPlayer to get a license
  // 3. creates a new license record
  // 4. saves the created license record
  // 5. return the saved license
  //! NOTE: should be used in other services after user bought course(s)
  async create({ coursesIds, name }: CreateLicense, user: User) {
    const courses = await this.courseRepository.findBy({ id: In(coursesIds) });

    const { data } = await this.httpService.axiosRef.post('/', {
      courses: courses.map((course) => course.spotPlayerCourseId),
      name,
      waterMark: {
        texts: [{ text: 'Amirhossein Mazaheri - ZeenZen.ir' }],
      },
    });

    const newLicense = new License();
    newLicense.licenseCode = data.key;
    newLicense.licenseId = data._id;
    newLicense.licenseUrl = data.url;
    newLicense.user = user;
    newLicense.courses = courses;

    await this.licenseRepository.manager.save(newLicense);

    return newLicense;
  }

  async findAll(user: RequestUser) {
    return await this.licenseRepository.find({
      where: this.getWhereOptions(user),
      relations: this.relations,
    });
  }

  async findOne(id: number, user: RequestUser) {
    return await this.validateLicense(id, user);
  }
}
