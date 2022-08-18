import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';

@Resolver('Elections')
export class ElectionMutationResolver {
  // constructor() {}

  @Mutation()
  async createElections(@Context() context, @Args('input') input) {
    const { role } = context;
    if (role !== 'updater') {
      return new AuthenticationError('This mutation requires authorization!');
    }

    const { agencyId, electionItems } = input;

    const tempItems = electionItems.map((election, index) => ({
      id: index,
      ...election,
      agencyId,
    }));

    return tempItems;
  }
}
