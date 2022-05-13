import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CandidateQLService } from '../../candidate/candidate.service';
import { ContributionsDetailsService } from '../../contributions/contributions-details/contributions-details.service';
import { OfficesService } from '../offices.service';

@Resolver('Office')
export class OfficeResolver {
  constructor(
    private candidateQLService: CandidateQLService,
    private contributionsDetailsService: ContributionsDetailsService,
    private officesService: OfficesService,
  ) {}

  @Query()
  async office(@Args() args) {
    const { electionYear, title } = args;

    const filters = {
      offices: [title],
    };

    return { title, electionYear, filters };
  }

  @ResolveField()
  async committeeCount(@Parent() parent, @Args() args) {
    const { electionYear, filters } = parent;
    const { filters: committeeFilters } = args;

    const combinedFilters = {
      ...(filters ? filters : []),
      ...(committeeFilters ? committeeFilters : []),
    };

    const committeeNames = await this.officesService.getCommitteeNames({
      electionYear,
      filters: combinedFilters,
    });

    let committeeCount = null;

    if (committeeNames.length > 0) {
      committeeCount = committeeNames.length;
    }

    return committeeCount;
  }

  @ResolveField()
  async totalContributions(@Parent() parent, @Args() args) {
    const { electionYear, filters } = parent;
    const { filters: committeeFilters } = args;

    const combinedFilters = {
      ...(filters ? filters : []),
      ...(committeeFilters ? committeeFilters : []),
    };

    const committeeNames = await this.officesService.getCommitteeNames({
      electionYear,
      filters: combinedFilters,
    });

    let sum = null;

    if (committeeNames.length > 0) {
      sum = await this.contributionsDetailsService.getContributionSum({
        committeeName: committeeNames,
      });
    }

    return sum;
  }

  @ResolveField()
  async candidates(@Parent() parent, @Args() args) {
    const { electionYear, filters } = parent;
    const { filters: committeeFilters } = args;

    const combinedFilters = {
      ...(filters ? filters : []),
      ...(committeeFilters ? committeeFilters : []),
    };

    const candidates = await this.candidateQLService.getCandidates({
      electionYear,
      filters: combinedFilters,
    });

    return candidates;
  }
}
