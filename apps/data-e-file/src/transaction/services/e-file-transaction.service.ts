import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClassValidationService } from '../../shared/class-validation.service';
import { EFileGetWorkbookService } from './e-file-get-workbook.service';
import { EFileXLSXService } from './e-file-xlsx.service';
import { CALWorksheets, XLSXWorksheetList } from './e-file-xlsx-worksheets';
import { TransactionMutateService } from './transaction-mutate.service';
require('expose-gc');

@Injectable()
export class EFileTransactionService {
  constructor(
    private eFileGetWorkbookService: EFileGetWorkbookService,
    private eFileXLSXService: EFileXLSXService,
    // private classValidationService: ClassValidationService,
    private readonly transactionMutateService: TransactionMutateService,
  ) {}

  private calWorksheets: XLSXWorksheetList[] = CALWorksheets;
  private url: string;
  private agencyShortcut: string;

  public async updateTransactions(
    graphQLUrl: string,
    agencyShortcut: string,
    year: number,
  ) {
    this.url = graphQLUrl;
    this.agencyShortcut = agencyShortcut;

    try {
      // Only download the workbook data for the year once per execution.
      const workbookFileData: Uint8Array = await firstValueFrom(
        this.eFileGetWorkbookService.getWorkbookFileData(year, true),
      );

      // Process the workbook one sheet at a time
      //  to avoid running out of memory.
      await this.processWorksheets(workbookFileData);

      // const candidates: EFileCandidate[] =
      //   await this.eFileGetCandidateService.getCandidates(id);

      // await this.classValidationService.validateClassArray(candidates);

      console.info('Update Transactions Complete');
    } catch (error) {
      console.error(`Error updating Transaction for ${year}`);
      console.error({ error });
    }
  }

  private async processWorksheets(workbookFileData: Uint8Array) {
    console.log('processWorksheets');

    for await (const sheet of this.calWorksheets.slice(0, 1)) {
      console.log({ sheet: sheet.sheetName });

      try {
        if (global.gc) {
          global.gc(); // Run Garbage Collection to free up memory on the Heap
        }
        // await this.processWorkbookSheet(workbookFileData, sheet, year);
        const workbookSheet = this.eFileXLSXService.readWorkbookSheet(
          workbookFileData,
          sheet.sheetName,
        );

        const sheetJSON = this.eFileXLSXService.getObjectRows(
          workbookSheet,
          sheet.sheetName,
        );
        if (global.gc) {
          global.gc(); // Run Garbage Collection to free up memory on the Heap
        }
        // loop through filingIds and mutate the GraphQL API for each
        // get the unique filing ids
        // const fillingIds = sheetJSON.map(
        //   (transaction) => transaction.e_filing_id,
        // );
        // const uniqueFillingIds = [...new Set(fillingIds)];

        //  NOTE: the filler_id field in a transaction may be empty in the eFile data!
        const filerIds = sheetJSON.map((transaction) => transaction.filer_id);
        const uniqueFilerIds = [...new Set(filerIds)];

        // console.log({ uniqueFilerIds });

        const fillerTransactions = sheetJSON.filter(
          (transaction) => transaction.filer_id === uniqueFilerIds[0],
        );
        console.log({ fillerTransactions: fillerTransactions[0] });

        const reportDates = fillerTransactions.map(
          (transaction) => transaction.rpt_date,
        );
        const uniqueReportDates = [...new Set(reportDates)];
        // console.log({ uniqueReportDates });

        // await this.replaceTransactions(sheet.type, uniqueFillingIds, sheetJSON);
        await this.replaceTransactions(
          sheet.type,
          sheet.formType,
          uniqueFilerIds[0],
          uniqueReportDates,
          fillerTransactions,
        );
      } catch (error) {
        console.error('Skipping Transactions for XLSX workbook sheet', {
          sheetName: sheet.sheetName,
        });
        console.error(error);
      }
    }
  }

  private async replaceTransactions(
    recType: string,
    formType: string,
    fillerId: string,
    reportDates: any[],
    transactions: any[],
  ) {
    for await (const reportDate of reportDates.slice(0, 1)) {
      const reportDateTransactions = transactions.filter(
        (transaction) => transaction.rpt_date === reportDate,
      );

      await this.transactionMutateService.mutateTransactions(
        this.url,
        this.agencyShortcut,
        fillerId,
        '000',
        reportDate,
        recType,
        formType,
        reportDateTransactions,
      );
    }
  }
}
