import { Injectable } from '@nestjs/common';
import { EFileGetWorkbookService } from './e-file-get-workbook.service';
import { EFileXLSXService } from './e-file-xlsx.service';

@Injectable()
export class EFileGetTransactionService {
  constructor(
    private eFileGetWorkbookService: EFileGetWorkbookService,
    private eFileXLSXService: EFileXLSXService,
  ) {}

  public async getTransactions(year: string) {
    // const responseArray: any[] = await this.getCandidateObjects(electionId);
    // return plainToClass(EFileCandidate, responseArray);
  }
}
