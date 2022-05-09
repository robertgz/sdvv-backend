import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { EFileCandidate } from '../e-file-candidate';

@Injectable()
export class EFileGetCandidateService {
  constructor(private httpService: HttpService) {}

  private eFileCandidateUrl =
    'https://efile.sandiego.gov/api/v1/public/campaign-search/candidate/list';

  public async getCandidates(electionId: string): Promise<EFileCandidate[]> {
    const responseArray: any[] = await this.getCandidateObjects(electionId);
    return plainToClass(EFileCandidate, responseArray);
  }

  private async getCandidateObjects(electionID: string) {
    const offices = await this.downloadOffices(electionID);

    const candidates = [];
    for (const office in offices) {
      offices[office].forEach((candidate) => {
        candidate['full_office_name'] = office;
        candidates.push(candidate);
      });
    }

    return candidates;
  }

  private async downloadOffices(electionID: string) {
    const url = `${this.eFileCandidateUrl}/${electionID}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));

      return response.data.data;
    } catch (error) {
      console.log({
        level: 'error',
        message: 'Get request to eFile API failed',
        type: 'eFile API',
        data: 'candidates',
        url: url,
      });
      throw error;
    }
  }
}
