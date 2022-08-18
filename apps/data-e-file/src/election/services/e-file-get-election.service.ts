import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { EFileElection } from '../e-file-election';

@Injectable()
export class EFileGetElectionService {
  constructor(private httpService: HttpService) {}

  private eFileElectionUrl =
    'https://efile.sandiego.gov/api/v1/public/campaign-search/election/list';

  public async getElections(): Promise<EFileElection[]> {
    const responseArray: any[] = await this.downloadElections();
    return plainToClass(EFileElection, responseArray);
  }

  public async getElectionID(electionDate: string): Promise<string> {
    const responseArray: any[] = await this.downloadElections();

    const foundElection = responseArray.find(
      (election) => election.election_date === electionDate,
    );

    return foundElection?.election_id;
  }

  private async downloadElections() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.eFileElectionUrl),
      );
      return response.data.data;
    } catch (error) {
      console.log({
        level: 'error',
        message: 'Get request to eFile API failed',
        type: 'efile API',
        data: 'elections',
        url: this.eFileElectionUrl,
      });
      throw error;
    }
  }
}
