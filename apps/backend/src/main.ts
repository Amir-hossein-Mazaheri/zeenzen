import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';
import passport from 'passport';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import configuration from './app/config/configuration';
import { AppModule } from './app/app.module';

const port = +process.env.PORT || 4000;

const RedisStore = connectRedis(session);

const redisClient = createClient({
  legacyMode: true,
});

redisClient.connect().catch(console.error);

async function bootstrap() {
  const { redis, sessionSecret } = configuration();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors({
    credentials: true,
    origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  app.use(cookieParser());

  app.use(
    session({
      name: 'zeenzen_sess',
      store: new RedisStore({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        client: redisClient,
        port: redis.port,
        host: redis.host,
        pass: redis.password,
        disableTouch: false,
      }),
      secret: sessionSecret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      },
    })
  );

  app.use(helmet());

  // add passport session auth layer
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);
}
bootstrap();
