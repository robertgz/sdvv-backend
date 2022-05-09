import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '../shared/shared.module';
import { EFileElectionCommand } from './e-file-election.command';
import { EFileGetElectionService } from './services/e-file-get-election.service';
import { EFileElectionService } from './services/e-file-election.service';
import { ElectionMutateService } from './services/election-mutate.service';

@Module({
  imports: [HttpModule, SharedModule],
  providers: [
    EFileElectionCommand,
    EFileElectionService,
    EFileGetElectionService,
    ElectionMutateService,
  ],
  exports: [EFileGetElectionService],
})
export class EFileElectionModule {}
