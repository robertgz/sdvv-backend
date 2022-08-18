import { Command, CommandRunner, Option } from 'nest-commander';
import { EFileTransactionService } from './services/e-file-transaction.service';

interface CommandOptions {
  url: string;
  shortcut: string;
  year: number;
}

// Run: node dist/apps/data-e-file/main transaction-update -u http://localhost:3000/graphql -s CSD -y 2020
@Command({
  name: 'transaction-update',
  description:
    'Fetch a list of transactions for a given agency and year and perform a GraphQL mutation to the primary API.',
})
export class EFileTransactionCommand implements CommandRunner {
  constructor(
    private readonly eFileTransactionService: EFileTransactionService,
  ) {}

  async run(passedParam: string[], options?: CommandOptions): Promise<void> {
    console.log({ options });

    if (!options?.url || !options?.shortcut || !options?.year) {
      console.log(`Error: missing an option`);
      return;
    }

    if (options?.url) {
      await this.eFileTransactionService.updateTransactions(
        options.url.toString(),
        options.shortcut.toString(),
        options.year,
      );
    }
  }

  @Option({
    flags: '-u, --url <string>',
    description: `GraphQL URL to return data to, example: http://localhost:3000/graphql`,
  })
  url(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --shortcut <string>',
    description: `Code used to determine which agency to return data for`,
  })
  shortcut(val: string): string {
    return val;
  }

  @Option({
    flags: '-y, --year <number>',
    description: `Code used to determine which year to return data for`,
  })
  year(val: string): number {
    return parseInt(val);
  }
}
