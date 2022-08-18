import { Args, Query, Resolver } from '@nestjs/graphql';
import { ElectionService } from './election.service';

@Resolver('Elections')
export class ElectionResolver {
  constructor(private electionService: ElectionService) {}

  @Query()
  async elections(@Args() args) {
    const { filters } = args;

    const result = await this.electionService.getElections({ filters });

    return result;
  }
}
