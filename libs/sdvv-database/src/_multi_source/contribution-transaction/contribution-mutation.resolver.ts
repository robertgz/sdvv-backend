import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';

@Resolver('ContributionsTransaction')
export class ContributionsMutationResolver {
  // constructor(private contributionsTransactionQLService: ContributionsTransactionQLService) {}

  @Mutation()
  async createContribution(@Context() context, @Args('input') input) {
    const { role } = context;
    if (role !== 'updater') {
      return new AuthenticationError('This mutation requires authorization!');
    }

    console.log({ input });
    return [];

    // const { agencyShortcut, transactionItems } = input;

    // const tempItems = candidateItems.map((candidate, index) => ({
    //   id: index,
    //   ...candidate,
    //   fullName: candidate.name,
    //   electionId,
    // }));

    // return tempItems;
  }
}
