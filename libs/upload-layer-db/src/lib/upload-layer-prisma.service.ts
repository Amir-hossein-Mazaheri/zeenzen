import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '../../prisma/client';

@Injectable()
export class UploadLayerPrismaService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    super({
      log: ['error', 'info', 'query', 'warn'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      if (!params?.args) {
        params.args = {};
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
