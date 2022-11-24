import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import * as moment from 'moment';
import { PrismaService } from '@zeenzen/database';

import { CreateAskAmirhosseinInput } from './dto/create-ask-amirhossein.input';
import { UpdateAskAmirhosseinInput } from './dto/update-ask-amirhossein.input';
import { AskAmirhossein } from './entities/ask-amirhossein.entity';
import { AnswerAskAmirhosseinInput } from './dto/answer-ask-amirhossein.input';
import { FindAllAskAmirhosseinInput } from './dto/find-all-ask-amirhossein.input';
import { FindOneAskAmirhosseinInput } from './dto/find-one-ask-amirhossein.input';
import { RequestUser, UserRole } from '../types';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { getMailOptions } from '../utils/getMailOptions';
import { sendEmail } from '../utils/sendEmail';
import { toCamelCase } from '../utils/toCamelCase';
import { Prisma } from '@prisma/client';

const ASK_AMIRHOSSEINS_PER_PAGE = 15;

@Injectable()
export class AskAmirhosseinService {
  constructor(
    // @InjectRepository(AskAmirhossein)
    // private readonly askAmirhosseinRepository: Repository<AskAmirhossein>,
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    // private readonly userService: UserService,
    // private readonly dataSource: DataSource,
    private readonly prismaService: PrismaService
  ) {}

  async getWhereOptions(email: string, user: RequestUser) {
    if (!user && !email) {
      throw new BadRequestException(
        'Either you should enter email address or be logged in.'
      );
    }

    if (email) {
      // const registeredUser = await this.userRepository.findOneBy({ email });
      const registeredUser = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (registeredUser && registeredUser.id !== user.sub) {
        throw new UnauthorizedException(
          "You can't see other registered users questions."
        );
      }
    }

    const whereOptions: Prisma.AskAmirhosseinWhereInput = {};

    if (!user) {
      whereOptions.email = email;
    } else if (user.role !== UserRole.ADMIN) {
      whereOptions.whoAsked = { id: user.sub };
    }

    return whereOptions;
  }

  validateAskAmirhossein(id: number) {
    return async (whereOptions?: Prisma.AskAmirhosseinWhereInput) => {
      // const askAmirhossein = await this.askAmirhosseinRepository.findOne({
      //   where: { id, ...whereOptions },
      // });

      const askAmirhossein = await this.prismaService.askAmirhossein.findFirst({
        where: {
          id,
          ...whereOptions,
        },
      });

      if (!askAmirhossein) {
        throw new NotFoundException('Invalid ask amirhossein id.');
      }

      return askAmirhossein;
    };
  }

  async create(
    { title, email, fullName, description }: CreateAskAmirhosseinInput,
    user: RequestUser
  ) {
    // if (!user && !email) {
    //   throw new BadRequestException(
    //     'Either you should enter email address or be logged in.'
    //   );
    // }

    // const currEmail = user?.email || email;

    // const newAskAmirhossein = new AskAmirhossein();
    // newAskAmirhossein.question = question;
    // newAskAmirhossein.email = currEmail;

    // if (currUser) {
    //   newAskAmirhossein.user = currUser;
    // }

    // if (email) {
    //   newAskAmirhossein.email = email;
    // }

    // await this.askAmirhosseinRepository.manager.save(newAskAmirhossein);

    // return newAskAmirhossein;

    const createAskAmirhosseinData: Prisma.AskAmirhosseinCreateArgs = {
      data: {
        title,
        description,
        email,
        fullName,
      },
    };

    if (user) {
      createAskAmirhosseinData.data.whoAsked = {
        connect: {
          email: user.email,
        },
      };
    }

    return await this.prismaService.askAmirhossein.create(
      createAskAmirhosseinData
    );
  }

  // answer ask amirhossein flow:
  // 1. validate ask amirhossein id
  // 2. validate that the "ask amirhossein" question is not answered
  // 3. update ask amirhossein record answer and answeredAt
  // 4. send email to target email
  // 5. saved the updated ask amirhossein record
  // 6. return the saved ask amirhossein record
  async answer(id: number, { answer }: AnswerAskAmirhosseinInput) {
    const askAmirhossein = await this.validateAskAmirhossein(id)();

    if (askAmirhossein.answer) {
      throw new ConflictException(
        "You can't answer twice, if you want to update use update mutation."
      );
    }

    // askAmirhossein.answer = answer;
    // askAmirhossein.answeredAt = moment.utc().toDate();

    const subject = `Ask Amirhossein - The answer to your "${askAmirhossein.question}" question`;

    await sendEmail(getMailOptions(askAmirhossein.email, subject, answer));

    // await this.askAmirhosseinRepository.manager.save(askAmirhossein);

    return await this.prismaService.askAmirhossein.update({
      where: { id: askAmirhossein.id },
      data: {
        ...askAmirhossein,
        answer,
        answeredAt: moment.utc().toDate(),
      },
    });

    // return askAmirhossein;
  }

  async findAll(page?: number) {
    const currPage = page || 1;

    const count = await this.prismaService.askAmirhossein.count();

    const askAmirhosseins = await this.prismaService.askAmirhossein.findMany({
      // where: {
      //   isPublished: true,
      // },
      take: ASK_AMIRHOSSEINS_PER_PAGE,
      skip: (currPage - 1) * ASK_AMIRHOSSEINS_PER_PAGE,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalPages = Math.ceil(count / ASK_AMIRHOSSEINS_PER_PAGE);

    const hasPrev = currPage !== 1;
    const hasNext = currPage < totalPages;

    return {
      page: currPage,
      count,
      totalPages,
      hasPrev,
      hasNext,
      askAmirhosseins,
    };
  }

  async findAllUserRelated(
    findAllAskAmirhosseinInput: FindAllAskAmirhosseinInput,
    user: RequestUser
  ) {
    // return await this.askAmirhosseinRepository.findBy(
    //   await this.getWhereOptions(findAllAskAmirhosseinInput?.email, user)
    // );

    return await this.prismaService.askAmirhossein.findMany({
      where: await this.getWhereOptions(
        findAllAskAmirhosseinInput?.email,
        user
      ),
    });
  }

  async findOne(
    id: number,
    findOneAskAmirhosseinInput: FindOneAskAmirhosseinInput,
    user: RequestUser
  ) {
    return await this.validateAskAmirhossein(id)(
      await this.getWhereOptions(findOneAskAmirhosseinInput?.email, user)
    );
  }

  async updateAnswer(
    id: number,
    updateAskAmirhosseinInput: UpdateAskAmirhosseinInput
  ) {
    const { email } = await this.validateAskAmirhossein(id)();

    const subject = ``;

    await sendEmail(
      getMailOptions(email, subject, updateAskAmirhosseinInput.answer)
    );

    // const updatedAskAmirhossein = await this.dataSource
    //   .createQueryBuilder()
    //   .update(AskAmirhossein)
    //   .set(updateAskAmirhosseinInput)
    //   .where({ id })
    //   .returning('*')
    //   .execute();

    // return toCamelCase(updatedAskAmirhossein);

    return await this.prismaService.askAmirhossein.update({
      where: {
        id,
      },
      data: updateAskAmirhosseinInput,
    });
  }
}
