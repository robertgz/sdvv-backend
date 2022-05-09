import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionMutationResolver } from './election-mutation.resolver';
import { ElectionEntity } from './election.entity';
// import { ElectionService } from './election.service';

@Module({
  imports: [TypeOrmModule.forFeature([ElectionEntity])],
  providers: [ElectionMutationResolver],
  exports: [],
})
export class ElectionModuleMS {}
