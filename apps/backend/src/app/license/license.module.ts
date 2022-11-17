import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { License } from './entities/license.entity';
import { LicenseResolver } from './license.resolver';
import { LicenseService } from './license.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([License]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: 'https://panel.spotplayer.ir/license/edit/',
        headers: {
          $API: config.get('SPOT_PLAYER_API'),
        },
      }),
    }),
    UserModule,
    CourseModule,
    DatabaseModule,
  ],
  providers: [LicenseService, LicenseResolver],
  exports: [
    // TypeOrmModule,
    LicenseModule,
  ],
})
export class LicenseModule {}
