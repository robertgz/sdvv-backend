import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
// import { CandidateQLService } from './candidate.service';

@Resolver('Candidates')
export class CandidatesMutationResolver {
  // constructor(private candidateQLService: CandidateQLService) {}

  @Mutation()
  async createCandidates(@Context() context, @Args('input') input) {
    const { role } = context;
    if (role !== 'updater') {
      return new AuthenticationError('This mutation requires authorization!');
    }

    const { electionId, candidateItems } = input;

    const tempItems = candidateItems.map((candidate, index) => ({
      id: index,
      ...candidate,
      fullName: candidate.name,
      electionId,
    }));

    return tempItems;
  }
}
