import { InputType, PickType } from '@nestjs/graphql';

import { SignUpInput } from './sign-up.input';

@InputType()
export class PreSignUpInput extends PickType(SignUpInput, ['email']) {}
