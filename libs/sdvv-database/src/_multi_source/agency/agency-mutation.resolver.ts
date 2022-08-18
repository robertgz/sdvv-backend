import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { AgencyQLService } from './agency.service';

@Resolver('Agency')
export class AgencyMutationResolver {
  constructor(private agencyQLService: AgencyQLService) {}

  @Mutation()
  async createAgencies(@Context() context, @Args('input') input) {
    const { role } = context;
    if (role !== 'updater') {
      return new AuthenticationError('This mutation requires authorization!');
    }

    const { source, agencyItems } = input;

    const tempItems = agencyItems.map((agency, index) => ({
      id: index,
      ...agency,
      source: source,
    }));

    return tempItems;
  }
}
