import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '../shared/shared.module';
import { EFileElectionModule } from '../election/e-file-election.module';
import { EFileCandidateCommand } from './e-file-candidate.command';
import { EFileCandidateService } from './services/e-file-candidate.service';
import { EFileGetCandidateService } from './services/e-file-get-candidate.service';
import { CandidateMutateService } from './services/candidate-mutate.service';

@Module({
  imports: [HttpModule, SharedModule, EFileElectionModule],
  providers: [
    EFileCandidateCommand,
    EFileCandidateService,
    EFileGetCandidateService,
    CandidateMutateService,
  ],
  exports: [],
})
export class EFileCandidateModule {}
