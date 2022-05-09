import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AgencyFetchModule } from './agency/e-file-agency.module';
import { EFileElectionModule } from './election/e-file-election.module';
import { EFileCandidateModule } from './candidate/e-file-candidate.module';
import { EFileTransactionModule } from './transaction/e-file-transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    AgencyFetchModule,
    EFileElectionModule,
    EFileCandidateModule,
    EFileTransactionModule,
  ],
  providers: [],
})
export class EFileModule {}
// data-e-file DataEFile
// data-net-file DataNetFile
