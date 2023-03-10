import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '@zeenzen/database';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionSerializer } from './serializers/session.serializer';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { UserModule } from '../user/user.module';
import { CartModule } from '../cart/cart.module';

@Global()
@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(config.get('JWT_ACCESS_SECRET'));
        return {
          secret: config.get('JWT_ACCESS_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    UserModule,
    CartModule,
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    LocalStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
    SessionSerializer,
    AuthenticatedGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
