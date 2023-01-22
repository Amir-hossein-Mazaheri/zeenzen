import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zeenzen/database';

@Injectable()
export class CartItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCourse(cartItemId: number) {
    return await this.prismaService.course.findFirst({
      where: {
        cartItems: {
          some: {
            id: cartItemId,
          },
        },
      },
    });
  }
}
