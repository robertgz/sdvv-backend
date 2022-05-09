import { Injectable } from '@nestjs/common';
import { ApolloClientService } from '../../shared/apollo-client';
import { EFileElection } from '../e-file-election';
import { CREATE_ELECTIONS } from './election-gql.mutation';

@Injectable()
export class ElectionMutateService {
  constructor(private readonly apolloClientService: ApolloClientService) {}

  async mutateAgencies(
    gqlURL: string,
    agencyId: string,
    elections: EFileElection[],
  ) {
    if (!gqlURL) return;
    if (elections?.length < 1) return;

    const gqlElections = JSON.parse(JSON.stringify(elections));

    const client = await this.apolloClientService.getApolloClient(gqlURL);

    await client.mutate({
      mutation: CREATE_ELECTIONS,
      variables: {
        input: {
          agencyId: agencyId,
          electionItems: gqlElections,
        },
      },
    });
  }
}
