import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EFileGetAgencyService } from './agency-query.service';

@Injectable()
export class AgencyService {
  constructor(
    private configService: ConfigService,
    private readonly eFileGetAgencyService: EFileGetAgencyService,
  ) {}

  private source = this.configService.get<string>('SOURCE');

  async updateAgencies(graphQLUrl: string, source: string) {
    const agencies = await this.eFileGetAgencyService.getAgencies(
      graphQLUrl,
      source,
    );
    // this.agencyQLService.createAgencies(agencies);

    console.log({ agencies });
    console.log(JSON.stringify(agencies, null, 2));
    console.log('updateAgencies done');
  }
}
