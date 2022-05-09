import { Injectable } from '@nestjs/common';
import { ApolloClientService } from '../../shared/apollo-client';
import { EFileCandidate } from '../e-file-candidate';
import { CREATE_CANDIDATES } from './candidate-gql.mutation';

@Injectable()
export class CandidateMutateService {
  constructor(private readonly apolloClientService: ApolloClientService) {}

  async mutateCandidates(
    gqlURL: string,
    electionId: string,
    candidates: EFileCandidate[],
  ) {
    if (!gqlURL) return;
    if (candidates?.length < 1) return;

    const gqlCandidate = JSON.parse(JSON.stringify(candidates));

    const client = await this.apolloClientService.getApolloClient(gqlURL);

    await client.mutate({
      mutation: CREATE_CANDIDATES,
      variables: {
        input: {
          electionId,
          candidateItems: gqlCandidate,
        },
      },
    });
  }
}
