import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@zeenzen/database';

import { PreRequirementService } from './pre-requirement.service';
import { PreRequirementResolver } from './pre-requirement.resolver';
import { PreRequirement } from './entities/pre-requirement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PreRequirement]), DatabaseModule],
  providers: [PreRequirementService, PreRequirementResolver],
  exports: [TypeOrmModule],
})
export class PreRequirementModule {}
