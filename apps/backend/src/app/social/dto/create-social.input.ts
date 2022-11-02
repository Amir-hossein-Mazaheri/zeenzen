import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { SocialType } from '../../types';

@InputType()
export class CreateSocialInput {
  @Field(() => SocialType, {
    description: 'social type which is an enum like GITHUB.',
  })
  @IsNotEmpty()
  @IsEnum(SocialType)
  type: SocialType;

  @Field(() => String, { description: 'link to social media account/page.' })
  @IsNotEmpty()
  link: string;
}
