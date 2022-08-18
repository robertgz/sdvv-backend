import { Module } from '@nestjs/common';
import { CandidateModule } from '../candidate/candidate.module';
import { ElectionYearResolver } from './election-year.resolver';
import { ElectionYearsService } from './election-years.service';
import { ElectionYearParams } from './election-year.validator';
import { ElectionModule } from '../election/election.module';

@Module({
  imports: [CandidateModule, ElectionModule],
  providers: [ElectionYearResolver, ElectionYearsService, ElectionYearParams],
  exports: [],
})
export class ElectionYearsModule {}
