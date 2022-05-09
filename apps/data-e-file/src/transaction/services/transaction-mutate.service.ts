import { Injectable } from '@nestjs/common';
import { ApolloClientService } from '../../shared/apollo-client';
import { REPLACE_TRANSACTIONS } from './transaction-gql.mutation';
// import { EFileCandidate } from '../e-file-candidate';

@Injectable()
export class TransactionMutateService {
  constructor(private readonly apolloClientService: ApolloClientService) {}

  async mutateTransactions(
    gqlURL: string,
    agencyShortcut: string,
    filerId: string,
    reportNumber: string,
    reportDate: string,
    recType: string,
    formType: string,
    transactions: any[], //: EFileTransactions[],
  ) {
    if (!gqlURL) return;
    if (transactions?.length < 1) return;

    const gqlTransactions = JSON.parse(JSON.stringify(transactions));

    const client = await this.apolloClientService.getApolloClient(gqlURL);

    await client.mutate({
      mutation: REPLACE_TRANSACTIONS,
      variables: {
        input: {
          agencyShortcut: 'CSD',
          filerId,
          reportNumber,
          reportDate,
          recType,
          formType,
          // unique transactions for a filing will be determined with filerId + reportDate
          // transactionItems: gqlTransactions,
        },
      },
    });
  }
}
