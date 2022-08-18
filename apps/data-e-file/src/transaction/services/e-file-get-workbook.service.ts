import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';

@Injectable()
export class EFileGetWorkbookService {
  constructor(private httpService: HttpService) {}

  private eFileBulkExportUrl =
    'https://efile.sandiego.gov/api/v1/public/campaign-bulk-export-url';

  public getWorkbookFileData(
    fileYear: number,
    mostRecent = true,
  ): Observable<Uint8Array> {
    return of(fileYear).pipe(
      mergeMap((year) => this.getDownloadURL(year, mostRecent)),
      mergeMap((url) => this.downloadXLSXArrayBuffer(url)),
      mergeMap((data) => this.convertToUint8Array(data)),
    );
  }

  private getDownloadURL(year: number, mostRecent = false): Observable<string> {
    const requestUrl = `${this.eFileBulkExportUrl}?year=${year}&most_recent_only=${mostRecent}`;

    return this.httpService.get(requestUrl).pipe(
      map((axiosResponse) => axiosResponse.data),
      map((eFileResponse) => eFileResponse.data),
      catchError((error) => {
        console.log({
          level: 'error',
          message: 'Not able to get URL of XLSX file from eFile.',
          transactionYear: year,
          url: requestUrl,
        });

        throw error;
      }),
    );
  }

  private downloadXLSXArrayBuffer(requestUrl: string): Observable<ArrayBuffer> {
    return of(requestUrl).pipe(
      mergeMap((url) => {
        return this.httpService.get(url, {
          responseType: 'arraybuffer',
          headers: {
            Accept: 'application/xlsx',
          },
        });
      }),
      catchError((error) => {
        console.log({
          level: 'error',
          message: 'Not able to download XLSX file.',
          url: requestUrl,
        });
        throw error;
      }),
      map((response) => response.data),
    );
  }

  private convertToUint8Array(data: ArrayBuffer): Observable<Uint8Array> {
    return of(data).pipe(
      map((data) => new Uint8Array(data)),
      catchError((error) => {
        console.log({
          level: 'error',
          message: 'Not able to convert data from ArrayBuffer to Uint8Array.',
        });
        throw error;
      }),
    );
  }
}
