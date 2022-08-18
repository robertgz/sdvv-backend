import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XLSX = require('xlsx');

@Injectable()
export class EFileXLSXService {
  public getObjectRows(
    workbook,
    sheetName: string,
    rawOption = false,
  ): Array<any> {
    try {
      const worksheet = workbook.Sheets[sheetName];

      const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const lowerCaseHeaders = headers[0].map((header) => header.toLowerCase());

      return XLSX.utils.sheet_to_json(worksheet, {
        header: lowerCaseHeaders,
        range: 1,
        raw: rawOption,
        defval: null,
      });
    } catch {
      console.error('Extracting json from XLSX sheet failed', {
        sheetName: sheetName,
      });
      throw `Error Extracting json from XLSX sheet: ${sheetName}`;
    }
  }

  public readWorkbookSheet(data: Uint8Array, worksheetName: string) {
    try {
      return XLSX.read(data, {
        type: 'array',
        sheets: worksheetName,
      });
    } catch (error) {
      console.log({
        level: 'error',
        message: 'Not able to read sheet from Uint8Array data.',
        sheetName: worksheetName,
      });
      throw error;
    }
  }
}
