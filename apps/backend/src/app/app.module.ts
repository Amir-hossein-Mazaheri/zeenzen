import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import GraphQLJSON from 'graphql-type-json';
import { ScheduleModule } from '@nestjs/schedule/dist';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import * as Joi from 'joi';

import { GraphqlThrottlerGuard } from './throttler.guard';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';
import { InstructorModule } from './instructor/instructor.module';
import { SocialModule } from './social/social.module';
import { ExpertiseModule } from './expertise/expertise.module';
import { CartModule } from './cart/cart.module';
import { CourseModule } from './course/course.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { QuestionModule } from './question/question.module';
import { SectionModule } from './section/section.module';
import { LectureModule } from './lecture/lecture.module';
import { PreRequirementModule } from './pre-requirement/pre-requirement.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { RolesGuard } from './user/guards/roles.guard';
import { UploadsModule } from './uploads/uploads.module';
import { TodoModule } from './todo/todo.module';
import { CouponModule } from './coupon/coupon.module';
import { TasksModule } from './tasks/tasks.module';
import { LogsModule } from './logs/logs.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { TicketsModule } from './tickets/tickets.module';
import { PaymentModule } from './payment/payment.module';
import { LicenseModule } from './license/license.module';
import { AskAmirhosseinModule } from './ask-amirhossein/ask-amirhossein.module';
import { ReportModule } from './report/report.module';
import { EmailSubscriptionModule } from './email-subscription/email-subscription.module';
import { QuestionHubModule } from './question-hub/question-hub.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(4000),
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        PAYMENT_TOKEN: Joi.string().required(),
        SPOT_PLAYER_API: Joi.string().required(),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASS: Joi.string().required(),
        EMAIL_PORT: Joi.number().required(),
      }).required(),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
        sortSchema: true,
        playground: false,
        plugins: [
          ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
        ],
        csrfPrevention: true,
        cors: {
          credentials: true,
          origin: [
            'https://studio.apollographql.com',
            'http://localhost:4000/graphql',
            'http://localhost:3000',
            'http://localhost:7000',
          ],
        },
        introspection: config.get('NODE_ENV') !== 'production',
        resolvers: {
          JSON: GraphQLJSON,
        },
        subscriptions: {
          'graphql-ws': {
            onConnect: (connectionParams) => {
              console.log(connectionParams);
            },
          },
          'subscriptions-transport-ws': true,
        },
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: 60,
        limit: 20,
        storage: new ThrottlerStorageRedisService({
          port: +config.get('REDIS_PORT'),
          host: config.get('REDIS_HOST'),
          password: config.get('REDIS_PASSWORD'),
        }),
      }),
    }),
    ScheduleModule.forRoot(),
    UserModule,
    InstructorModule,
    SocialModule,
    ExpertiseModule,
    CartModule,
    CourseModule,
    OrderModule,
    CommentModule,
    QuestionModule,
    SectionModule,
    LectureModule,
    PreRequirementModule,
    AuthModule,
    CategoryModule,
    UploadsModule,
    TodoModule,
    CouponModule,
    TasksModule,
    LogsModule,
    HealthCheckModule,
    TicketsModule,
    PaymentModule,
    LicenseModule,
    AskAmirhosseinModule,
    ReportModule,
    EmailSubscriptionModule,
    QuestionHubModule,
    NotificationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GraphqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
