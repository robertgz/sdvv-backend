import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../shared/shared.module';
import { AgencyCommand } from './e-file-agency.command';
import { AgencyMutateService } from './services/agency-mutate.service';
import { AgencyService } from './services/e-file-agency.service';
import { EFileGetAgencyService } from './services/e-file-get-agency.service';

@Module({
  imports: [SharedModule, ConfigModule],
  providers: [
    AgencyCommand,
    AgencyService,
    AgencyMutateService,
    EFileGetAgencyService,
  ],
  exports: [],
})
export class AgencyFetchModule {}
