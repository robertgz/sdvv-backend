import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { EXPNEntity } from '@app/sdvv-database/tables-xlsx/expn/expn.entity';

@Injectable()
export class ExpenseTransactionService {
  constructor(private connection: Connection) {}

  private EXPNTypes = ['E'];

  async getTransactions({ committeeName, filters, limit = 20 }) {
    // const query = this.connection
    //   .getRepository(EXPNEntity)
    //   .createQueryBuilder()
  }
}
