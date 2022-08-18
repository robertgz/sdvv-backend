import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ElectionService } from '../../election/election.service';
import { AgencyQLService } from './agency.service';

@Resolver('Agency')
export class AgencyResolver {
  constructor(
    private agencyQLService: AgencyQLService,
    private electionService: ElectionService,
  ) {}

  // @Query()
  // async getAgency(@Args('id') id: string) {
  //   const agency = await this.agencyQLService.getAgency(id);

  //   return agency;
  // }

  // @Query()
  // async getAllAgencies() {
  //   const agencies = await this.agencyQLService.getAgencies();
  //   return agencies;
  // }

  @ResolveField()
  async elections(@Parent() parent) {
    const { id } = parent;
    const filters = {
      agencyId: id,
    };

    const result = await this.electionService.getElections({ filters });

    return result;
  }
}
