import { Command, CommandRunner, Option } from 'nest-commander';
import { AgencyService } from './services/agency.service';

interface AgencyCommandOptions {
  url: string;
  source: string;
}

@Command({
  name: 'agency-update',
  description:
    'Fetch a list of cities the system supports and perform a GraphQL mutation to the primary API.',
})
export class AgencyCommand implements CommandRunner {
  constructor(private readonly agencyService: AgencyService) {}

  async run(
    passedParam: string[],
    options?: AgencyCommandOptions,
  ): Promise<void> {
    console.log('AgencyCommand');
    console.log({ options });

    if (options?.url && options?.source) {
      await this.agencyService.updateAgencies(
        options.url.toString(),
        options.source.toString(),
      );
    }
  }

  @Option({
    flags: '-u, --url <string>',
    description: `GraphQL URL to return data to, example: http://localhost:3000/graphql`,
  }) // Should class-validator be used on the input URL?
  host(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --source <string>',
    description: `Identifier of website to provides data. Currently: SDEFILE`,
  })
  source(val: string): string {
    return val;
  }
}

// Run after compiling: node dist/apps/data-e-file/main agency-update -u http://localhost:3000/graphql -s SDEFILE

// run ts-node apps/data-e-file/src/main.ts agency-update -u http://localhost:3100/graphql -s SDEFILE
