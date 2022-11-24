import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import * as argon2 from 'argon2';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@zeenzen/database';

import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { LimitedUpdateUserInput } from './dto/limited-update-user.input';
import { Avatar } from '../uploads/entities/avatar.entity';
import { RequestUser } from '../types';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cart/entities/cart-item.entity';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User) private userRepository: Repository<User>,
    // @InjectRepository(Avatar) private avatarRepository: Repository<Avatar>,
    // private dataSource: DataSource,
    private readonly prismaService: PrismaService
  ) {}

  async validateUser(
    id: number,
    withDeleted = false,
    withAvatar = false,
    transaction?: Prisma.TransactionClient
  ) {
    // const user = await this.userRepository.findOne({
    //   where: { id },
    //   withDeleted,
    //   relations: {
    //     avatar: withAvatar,
    //   },
    // });

    let user: Prisma.UserGetPayload<{
      include: {
        avatar: true;
      };
    }>;

    const findOptions = {
      where: { id },
      // TODO: add deleted after adding prisma soft delete middleware
      include: {
        avatar: withAvatar,
      },
    };

    if (transaction) {
      user = await transaction.user.findUnique(findOptions);
    } else {
      user = await this.prismaService.user.findUnique(findOptions);
    }

    if (!user) {
      throw new BadRequestException(
        `Invalid user id or user is ${
          !withDeleted ? 'already removed' : 'is not removed'
        }.`
      );
    }

    return user;
  }

  async updateUser(id: number, values: Prisma.UserUpdateInput) {
    // await this.dataSource
    //   .createQueryBuilder()
    //   .update<User>(User)
    //   .set(values)
    //   .where({ id })
    //   .execute();

    await this.prismaService.user.update({
      where: { id },
      data: values,
    });
  }

  async limitedUpdateUser(
    {
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      newPassword,
      repeatNewPassword,
    }: LimitedUpdateUserInput,
    user: RequestUser
  ) {
    const currUser = await this.validateUser(user.sub);

    if (!(await argon2.verify(currUser.password, password))) {
      throw new UnauthorizedException('Invalid password.');
    }

    if (newPassword !== repeatNewPassword) {
      throw new BadRequestException(
        "New Password doesn't match repeat password"
      );
    }

    if (newPassword) {
      currUser.password = await argon2.hash(newPassword);
    }

    // currUser.firstname = firstname || currUser.firstname;
    // currUser.lastname = lastname || currUser.lastname;
    // currUser.email = email || currUser.email;
    // currUser.phoneNumber = phoneNumber || currUser.phoneNumber;

    // await this.userRepository.manager.save(currUser);

    // return currUser;

    return await this.prismaService.user.update({
      where: {
        id: user.sub,
      },
      data: {
        firstname: firstname || currUser.firstname,
        lastname: lastname || currUser.lastname,
        email: email || currUser.email,
        phoneNumber: phoneNumber || currUser.phoneNumber,
        password: currUser.password,
      },
    });
  }

  async getAvatar(userId: number) {
    // return await this.avatarRepository.findOneBy({ user: { id: userId } });
    return await this.prismaService.avatar.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async getCart(userId: number) {
    // const cart = await this.dataSource
    //   .getRepository(Cart)
    //   .findOneBy({ user: { id: userId } });

    // const { totalPrice, totalPriceWithDiscount } = await this.dataSource
    //   .getRepository(CartItem)
    //   .createQueryBuilder('cartItems')
    //   .where({ cart: { id: cart.id } })
    //   .select('SUM(cartItems.unitPrice)', 'totalPrice')
    //   .addSelect(
    //     'SUM(cartItems.unitPriceWithDiscount)',
    //     'totalPriceWithDiscount'
    //   )
    //   .getRawOne<{ totalPrice: number; totalPriceWithDiscount: number }>();

    // return { ...cart, totalPrice, totalPriceWithDiscount };

    const cart = await this.prismaService.cart.findFirst({
      where: {
        user: { id: userId },
      },
    });

    const {
      _sum: {
        unitPrice: totalPrice,
        unitPriceWithDiscount: totalPriceWithDiscount,
      },
    } = await this.prismaService.cartItem.aggregate({
      where: {
        cart,
      },
      _sum: {
        unitPrice: true,
        unitPriceWithDiscount: true,
      },
    });

    return {
      ...cart,
      totalPrice: totalPrice || '0.00',
      totalPriceWithDiscount: totalPriceWithDiscount || '0.00',
    };
  }

  async findAll() {
    // return await this.userRepository.find();
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.validateUser(id, false, true);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.validateUser(id);

    await this.updateUser(id, updateUserInput);

    return user;
  }

  async remove(id: number) {
    await this.validateUser(id);

    // await this.userRepository
    //   .createQueryBuilder()
    //   .softDelete()
    //   .where({ id })
    //   .execute();

    // return user;

    return await this.prismaService.user.delete({
      where: { id },
    });
  }

  // TODO: replace with update and restore arg in prisma
  async restore(id: number) {
    await this.validateUser(id, true);

    // await this.userRepository
    //   .createQueryBuilder()
    //   .restore()
    //   .where({ id })
    //   .execute();

    // return user;
  }
}
