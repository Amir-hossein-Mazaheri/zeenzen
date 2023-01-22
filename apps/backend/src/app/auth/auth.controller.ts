import { Controller, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RequestUser, UserRole } from '../types';
import { Roles } from '../user/decorators/roles.decorator';
import { GetUser } from '../user/decorators/user.decorator';

@Roles(UserRole.CUSTOMER)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/session')
  getSession(@GetUser() user: RequestUser) {
    return user;
  }
}
