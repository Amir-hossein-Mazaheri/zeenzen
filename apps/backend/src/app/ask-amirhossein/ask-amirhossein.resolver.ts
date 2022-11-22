import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AskAmirhosseinService } from './ask-amirhossein.service';
import { AskAmirhossein } from './entities/ask-amirhossein.entity';
import { CreateAskAmirhosseinInput } from './dto/create-ask-amirhossein.input';
import { UpdateAskAmirhosseinInput } from './dto/update-ask-amirhossein.input';
import { AnswerAskAmirhosseinInput } from './dto/answer-ask-amirhossein.input';
import { FindAllAskAmirhosseinInput } from './dto/find-all-ask-amirhossein.input';
import { FindOneAskAmirhosseinInput } from './dto/find-one-ask-amirhossein.input';
import { RequestUser, UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';

@Resolver(() => AskAmirhossein)
export class AskAmirhosseinResolver {
  constructor(private readonly askAmirhosseinService: AskAmirhosseinService) {}

  @Mutation(() => AskAmirhossein)
  createAskAmirhossein(
    @Args('createAskAmirhosseinInput')
    createAskAmirhosseinInput: CreateAskAmirhosseinInput
  ) {
    return this.askAmirhosseinService.create(createAskAmirhosseinInput);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => AskAmirhossein)
  answerAskAmirhossein(
    @Args('answerAskAmirhosseinInput')
    answerAskAmirhosseinInput: AnswerAskAmirhosseinInput
  ) {
    return this.askAmirhosseinService.answer(
      answerAskAmirhosseinInput.id,
      answerAskAmirhosseinInput
    );
  }

  @Query(() => [AskAmirhossein], { name: 'askAmirhosseins' })
  findAll(
    @Args('findAllAskAmirhosseinInput', { nullable: true })
    findAllAskAmirhosseinInput: FindAllAskAmirhosseinInput,
    @GetUser() user: RequestUser
  ) {
    return this.askAmirhosseinService.findAll(findAllAskAmirhosseinInput, user);
  }

  @Query(() => AskAmirhossein, { name: 'askAmirhossein' })
  findOne(
    @Args('findOneAskAmirhossein')
    findOneAskAmirhosseinInput: FindOneAskAmirhosseinInput,
    @GetUser() user: RequestUser
  ) {
    return this.askAmirhosseinService.findOne(
      findOneAskAmirhosseinInput.id,
      findOneAskAmirhosseinInput,
      user
    );
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => AskAmirhossein)
  updateAskAmirhosseinAnswer(
    @Args('updateAskAmirhosseinInput')
    updateAskAmirhosseinInput: UpdateAskAmirhosseinInput
  ) {
    return this.askAmirhosseinService.updateAnswer(
      updateAskAmirhosseinInput.id,
      updateAskAmirhosseinInput
    );
  }
}
