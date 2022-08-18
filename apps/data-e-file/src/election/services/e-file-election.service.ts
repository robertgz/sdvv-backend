import { Injectable } from '@nestjs/common';
import { ClassValidationService } from '../../shared/class-validation.service';
import { EFileElection } from '../e-file-election';
import { EFileGetElectionService } from './e-file-get-election.service';
import { ElectionMutateService } from './election-mutate.service';

@Injectable()
export class EFileElectionService {
  constructor(
    private readonly eFileGetElectionService: EFileGetElectionService,
    private classValidationService: ClassValidationService,
    private readonly electionMutateService: ElectionMutateService,
  ) {}

  public async updateElections(graphQLUrl: string, agencyId: string) {
    try {
      const elections: EFileElection[] =
        await this.eFileGetElectionService.getElections();

      await this.classValidationService.validateClassArray(elections);

      await this.electionMutateService.mutateAgencies(
        graphQLUrl,
        agencyId,
        elections,
      );

      // const id = await this.eFileGetElectionService.getElectionID('06/07/202');
      // console.log({ id });

      console.info('Update Elections Complete');
    } catch (error) {
      console.error('Error updating Elections');
      console.error({ error });
    }
  }
}
