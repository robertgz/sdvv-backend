import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ElectionModule } from '../election/election.module';
import { ElectionModule } from '@app/sdvv-database/election/election.module';
import { AgencyEntity } from './agency.entity';
import { AgencyQLService } from './agency.service';
import { AgencyResolver } from './agency.resolver';
import { AgencyMutationResolver } from './agency-mutation.resolver';

@Module({
  imports: [ElectionModule, TypeOrmModule.forFeature([AgencyEntity])],
  providers: [AgencyResolver, AgencyMutationResolver, AgencyQLService],
  exports: [AgencyQLService],
})
export class AgencyModuleMS {}
