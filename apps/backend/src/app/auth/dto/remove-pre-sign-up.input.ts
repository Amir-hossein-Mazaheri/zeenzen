import { InputType, PickType } from '@nestjs/graphql';

import { SignUpInput } from './sign-up.input';

@InputType()
export class RemovePreSignUpInput extends PickType(SignUpInput, ['email']) {}
