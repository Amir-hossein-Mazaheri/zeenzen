import { PassportSerializer } from '@nestjs/passport';

import { RequestUser, RequestInstructor, UserRole } from '../../types';
import { User } from '../../user/entities/user.entity';

//this class gets the user object in request serialize it and then pass request into other parts
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: User,
    done: (err: Error, user: RequestUser | RequestInstructor) => void
  ) {
    if (user.role === UserRole.INSTRUCTOR || user.role === UserRole.ADMIN) {
      done(null, {
        sub: user.id,
        email: user.email,
        role: user.role,
        instructorId: user.instructor.id,
      });
      return;
    }

    done(null, {
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }

  deserializeUser(payload: any, done: (err: Error, payload: string) => void) {
    done(null, payload);
  }
}
