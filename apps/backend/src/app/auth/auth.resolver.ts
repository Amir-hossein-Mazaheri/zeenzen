import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LogoutMessage } from './dto/logout-message.dto';
import { PreSignUpInput } from './dto/pre-sign-up.input';
import { RemovePreSignUpInput } from './dto/remove-pre-sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { ValidatedEmail } from './entities/validated-email.entity';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User, {
    description: 'sign user in with session and log it into database.',
  })
  @UseGuards(LocalAuthGuard)
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @Mutation(() => ValidatedEmail)
  preSignUp(@Args('preSignUpInput') preSignUpInput: PreSignUpInput) {
    return this.authService.preSignUp(preSignUpInput);
  }

  @Mutation(() => ValidatedEmail)
  removePreSignUpCode(
    @Args('removePreSignUpInput') removePreSignUpInput: RemovePreSignUpInput
  ) {
    return this.authService.removePreSignUpCode(removePreSignUpInput);
  }

  @Mutation(() => User, {
    description: 'easy user sign up with email and password.',
  })
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => LogoutMessage, {
    description:
      'logs user out by clearing session and cookie and log it into database.',
  })
  @UseGuards(AuthenticatedGuard)
  logout(@Context() ctx: any) {
    return this.authService.logout(ctx);
  }
}
