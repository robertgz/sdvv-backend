import { Command, CommandRunner, Option } from 'nest-commander';
import { EFileElectionService } from './services/e-file-election.service';

interface CommandOptions {
  url: string;
  agencyId: string;
  shortcut: string;
}

// Run: node dist/apps/data-e-file/main election-update -u http://localhost:3000/graphql -aid aid123 -s CSD
@Command({
  name: 'election-update',
  description:
    'Fetch a list of elections and perform a GraphQL mutation to the primary API.',
})
export class EFileElectionCommand implements CommandRunner {
  constructor(private readonly eFileElectionService: EFileElectionService) {}

  async run(passedParam: string[], options?: CommandOptions): Promise<void> {
    console.log({ options });

    if (!options?.url || !options?.agencyId) {
      console.log(`Error: missing an option`);
      return;
    }

    if (options?.url) {
      await this.eFileElectionService.updateElections(
        options.url.toString(),
        options.agencyId.toString(),
      );
    }
  }

  @Option({
    flags: '-u, --url <string>',
    description: `GraphQL URL to return data to, example: http://localhost:3000/graphql`,
  }) // Should class-validator be used on the input URL?
  url(val: string): string {
    return val;
  }

  @Option({
    flags: '-aid, --agencyId <string>',
    description: `Id of the agency to use for returned data`,
  })
  id(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --shortcut [string]',
    description: `Code used to determine which agency to return data for`,
  }) // Not used for SD eFile but will be required for NetFile.
  shortcut(val: string): string {
    return val;
  }
}
