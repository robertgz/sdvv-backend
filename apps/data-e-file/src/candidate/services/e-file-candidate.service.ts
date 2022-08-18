import { Injectable } from '@nestjs/common';
import { ClassValidationService } from '../../shared/class-validation.service';
import { EFileGetElectionService } from '../../election/services/e-file-get-election.service';
import { EFileGetCandidateService } from './e-file-get-candidate.service';
import { EFileCandidate } from '../e-file-candidate';
import { CandidateMutateService } from './candidate-mutate.service';

@Injectable()
export class EFileCandidateService {
  constructor(
    private readonly eFileGetElectionService: EFileGetElectionService,
    private readonly eFileGetCandidateService: EFileGetCandidateService,
    private classValidationService: ClassValidationService,
    private readonly candidateMutateService: CandidateMutateService,
  ) {}

  public async updateCandidates(
    graphQLUrl: string,
    electionId: string,
    electionDate: string,
  ) {
    try {
      const id = await this.eFileGetElectionService.getElectionID(electionDate);

      const candidates: EFileCandidate[] =
        await this.eFileGetCandidateService.getCandidates(id);

      await this.classValidationService.validateClassArray(candidates);

      await this.candidateMutateService.mutateCandidates(
        graphQLUrl,
        electionId,
        candidates,
      );

      console.info('Update Candidates Complete');
    } catch (error) {
      console.error('Error updating Candidates');
      console.error({ error });
    }
  }
}
