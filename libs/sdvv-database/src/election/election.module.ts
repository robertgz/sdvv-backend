import { Module } from '@nestjs/common';
import { ElectionResolver } from './election.resolver';
import { ElectionService } from './election.service';

@Module({
  imports: [],
  providers: [ElectionResolver, ElectionService],
  exports: [ElectionService],
})
export class ElectionModule {}
