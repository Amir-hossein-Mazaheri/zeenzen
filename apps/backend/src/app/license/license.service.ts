import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { RequestUser, UserRole, CreateLicense } from '../types';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LicenseService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService
  ) {}

  getWhereOptions(user: RequestUser, id?: number) {
    const whereOptions: Prisma.LicenseWhereInput = {};

    if (id) {
      whereOptions.id = id;
    }

    if (user.role !== UserRole.ADMIN) {
      whereOptions.user = {
        id: user.sub,
      };
    }

    return whereOptions;
  }

  async validateLicense(id: number, user: RequestUser) {
    const license = await this.prismaService.license.findFirst({
      where: this.getWhereOptions(user, id),
      include: {
        user: true,
        courses: true,
      },
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
    const courses = await this.prismaService.course.findMany({
      where: {
        id: {
          in: coursesIds,
        },
      },
    });

    const { data: licenseData } = await this.httpService.axiosRef.post('/', {
      courses: courses.map((course) => course.spotPlayerCourseId),
      name,
      waterMark: {
        texts: [{ text: 'Amirhossein Mazaheri - ZeenZen.ir' }],
      },
    });

    return await this.prismaService.license.create({
      data: {
        licenseCode: licenseData.key,
        licenseId: licenseData._id,
        licenseUrl: licenseData.url,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async findAll(user: RequestUser) {
    return await this.prismaService.license.findMany({
      where: this.getWhereOptions(user),
      include: {},
    });
  }

  async findOne(id: number, user: RequestUser) {
    return await this.validateLicense(id, user);
  }
}
