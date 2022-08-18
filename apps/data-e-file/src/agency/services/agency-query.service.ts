import { Injectable } from '@nestjs/common';
import { ApolloClientService } from '../../shared/apollo-client';
import { GET_AGENCIES } from './agency-gql.query';

@Injectable()
export class EFileGetAgencyService {
  constructor(private readonly apolloClientService: ApolloClientService) {}

  public async getAgencies(gqlURL: string, source: string): Promise<any[]> {
    if (!gqlURL || !source) return [];

    const client = await this.apolloClientService.getApolloClient(gqlURL);

    const response = await client.query({
      query: GET_AGENCIES,
      variables: {
        input: {
          source: source,
        },
      },
    });

    return response.data;
  }
}
