import { Injectable } from '@nestjs/common';
import { ApolloClientService } from '../../shared/apollo-client';
import { CREATE_AGENCIES } from './agency-gql.mutation';

@Injectable()
export class AgencyMutateService {
  constructor(private readonly apolloClientService: ApolloClientService) {}

  async mutateAgencies(gqlURL: string, source: string, agencies: any[]) {
    if (!gqlURL) return;
    if (agencies?.length < 1) return;

    const client = await this.apolloClientService.getApolloClient(gqlURL);

    const response = await client.mutate({
      mutation: CREATE_AGENCIES,
      variables: {
        input: {
          source: source,
          agencyItems: agencies,
        },
      },
    });

    console.log({ 'response.data': response.data });
    console.log('mutateAgencies done');
  }
}
