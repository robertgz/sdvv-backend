import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '../shared/shared.module';
import { EFileTransactionCommand } from './e-file-transaction.command';
import { EFileTransactionService } from './services/e-file-transaction.service';
import { EFileGetWorkbookService } from './services/e-file-get-workbook.service';
import { EFileXLSXService } from './services/e-file-xlsx.service';
import { TransactionMutateService } from './services/transaction-mutate.service';

@Module({
  imports: [HttpModule, SharedModule],
  providers: [
    EFileTransactionCommand,
    EFileTransactionService,
    EFileGetWorkbookService,
    EFileXLSXService,
    TransactionMutateService,
  ],
  exports: [],
})
export class EFileTransactionModule {}
