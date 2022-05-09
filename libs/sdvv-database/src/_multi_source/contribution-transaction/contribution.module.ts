import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributionsMutationResolver } from './contribution-mutation.resolver';
import { ContributionsEntity } from './contribution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContributionsEntity])],
  providers: [ContributionsMutationResolver],
  exports: [],
})
export class ContributionsModuleMS {}
