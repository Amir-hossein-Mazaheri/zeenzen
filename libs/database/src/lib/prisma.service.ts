import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['error', 'info', 'query', 'warn'],
      errorFormat: 'pretty',
    });

    // this middleware adds soft delete by passing softDelete to args
    this.$use(async (params, next) => {
      // make sure that softDelete is passed
      if (!params.args['softDelete']) return next(params);

      if (params.action === 'delete') {
        params.action = 'update';

        params.args['data'] = {
          deleted: true,
        };
      }

      if (params.action === 'deleteMany') {
        params.action = 'updateMany';

        if (params.args.data !== undefined) {
          params.args.data['deleted'] = true;
        } else {
          params.args['data'] = {
            deleted: true,
          };
        }
      }

      return next(params);
    });

    // this middleware filter soft deleted records
    this.$use(async (params, next) => {
      const withDeleted = !!params.args['withDeleted'];

      if (params.action === 'findFirst' || params.action === 'findUnique') {
        params.action = 'findFirst';
        params.args.where['deleted'] = withDeleted;
      }

      if (params.action === 'findMany') {
        if (params.args.where) {
          if (params.args.where.deleted === undefined) {
            params.args.where['deleted'] = withDeleted;
          }
        } else {
          params.args['where'] = {
            deleted: withDeleted,
          };
        }
      }

      return next(params);
    });

    // this middleware adds restoring soft deleted record(s)
    this.$use(async (params, next) => {
      // makes sure that restore is passed
      if (!params.args['restore']) return next(params);

      if (params.action === 'update') {
        params.args.data = {
          deleted: false,
        };
      }

      if (params.action === 'updateMany') {
        // TODO: this piece must be tested, because of lack of type safety
        params.args.data = params.args.data.map(() => ({
          deleted: false,
        }));
      }

      return next(params);
    });

    // this middleware makes sure that only not soft deleted records can get be updated
    this.$use(async (params, next) => {
      // make sure that this middleware doesn't override restore middleware
      if (params.args['restore']) return next(params);

      if (params.action === 'update') {
        params.action = 'updateMany';

        params.args.where['deleted'] = false;
      }

      if (params.action === 'updateMany') {
        if (params.args.where !== undefined) {
          params.args.where['deleted'] = false;
        } else {
          params.args['where'] = {
            deleted: false,
          };
        }
      }

      return next(params);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
