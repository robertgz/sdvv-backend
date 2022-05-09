import { Injectable } from '@nestjs/common';

const AGENCIES = [
  {
    shortcut: 'CSD',
    name: 'San Diego, City of',
  },
];

@Injectable()
export class EFileGetAgencyService {
  public async getAgencies(): Promise<any[]> {
    return AGENCIES;
  }
}
