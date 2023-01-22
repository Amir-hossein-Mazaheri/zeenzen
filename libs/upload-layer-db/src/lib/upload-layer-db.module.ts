import { Module } from '@nestjs/common';

import { UploadLayerPrismaService } from './upload-layer-prisma.service';

@Module({
  controllers: [],
  providers: [UploadLayerPrismaService],
  exports: [UploadLayerPrismaService],
})
export class UploadLayerDbModule {}
