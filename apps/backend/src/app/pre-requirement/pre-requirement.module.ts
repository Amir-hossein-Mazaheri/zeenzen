import { Module } from '@nestjs/common';
import { DatabaseModule } from '@zeenzen/database';

import { PreRequirementService } from './pre-requirement.service';
import { PreRequirementResolver } from './pre-requirement.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [PreRequirementService, PreRequirementResolver],
})
export class PreRequirementModule {}
