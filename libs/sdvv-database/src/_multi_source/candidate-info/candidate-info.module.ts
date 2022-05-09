import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateInfoEntity } from './candidate-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateInfoEntity])],
  providers: [],
  exports: [],
})
export class CandidateInfoModuleMS {}
