import { Command, CommandRunner, Option } from 'nest-commander';
import { AgencyService } from './services/e-file-agency.service';

interface AgencyCommandOptions {
  url: string;
}

// Run: node dist/apps/data-e-file/main agency-update -u http://localhost:3000/graphql
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

    if (options?.url) {
      await this.agencyService.updateAgencies(options.url.toString());
    }
  }

  @Option({
    flags: '-u, --url <string>',
    description: `GraphQL URL to return data to, example: http://localhost:3000/graphql`,
  }) // Should class-validator be used on the input URL?
  host(val: string): string {
    return val;
  }
}
