import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatesMutationResolver } from './candidate-mutation.resolver';
import { CandidateEntity } from './candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateEntity])],
  providers: [CandidatesMutationResolver],
  exports: [],
})
export class CandidateModuleMS {}
