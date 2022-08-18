import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../shared/shared.module';
import { AgencyCommand } from './agency.command';

import { AgencyService } from './services/agency.service';
import { EFileGetAgencyService } from './services/agency-query.service';

@Module({
  imports: [SharedModule, ConfigModule],
  providers: [AgencyCommand, AgencyService, EFileGetAgencyService],
  exports: [],
})
export class AgencyFetchModule {}
