import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AgencyMutateService } from './agency-mutate.service';
import { EFileGetAgencyService } from './e-file-get-agency.service';

@Injectable()
export class AgencyService {
  constructor(
    private configService: ConfigService,
    private readonly eFileGetAgencyService: EFileGetAgencyService,
    private readonly agencyMutateService: AgencyMutateService,
  ) {}

  private source = this.configService.get<string>('SOURCE');

  async updateAgencies(graphQLUrl: string) {
    const agencies = await this.eFileGetAgencyService.getAgencies();
    this.agencyMutateService.mutateAgencies(graphQLUrl, this.source, agencies);
  }
}
