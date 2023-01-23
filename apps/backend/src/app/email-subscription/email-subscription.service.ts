import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';

@Injectable()
export class EmailSubscriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  async subscribe(email: string) {
    await this.preventsDuplicateEmail(email);

    return await this.prismaService.emailSubscription.create({
      data: {
        email,
      },
    });
  }

  async preventsDuplicateEmail(email: string) {
    if (
      !(await this.prismaService.emailSubscription.findUnique({
        where: { email },
      }))
    ) {
      throw new BadRequestException('Email already exists.');
    }
  }
}
