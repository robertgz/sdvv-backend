import { Command, CommandRunner, Option } from 'nest-commander';
import { EFileCandidateService } from './services/e-file-candidate.service';

interface CommandOptions {
  url: string;
  // agencyShortcut: string;
  electionId: string;
  electionDate: string;
}

// Run: node dist/apps/data-e-file/main candidate-update -u http://localhost:3000/graphql -eid eid1234 -e 11/03/2020
@Command({
  name: 'candidate-update',
  description:
    'Fetch a list of candidates for a given election and perform a GraphQL mutation to the primary API.',
})
export class EFileCandidateCommand implements CommandRunner {
  constructor(private readonly eFileCandidateService: EFileCandidateService) {}

  async run(passedParam: string[], options?: CommandOptions): Promise<void> {
    console.log({ options });

    if (!options?.url || !options?.electionId || !options?.electionDate) {
      console.log(`Error: missing an option`);
      return;
    }

    if (options?.url) {
      await this.eFileCandidateService.updateCandidates(
        options.url.toString(),
        options.electionId.toString(),
        options.electionDate.toString(),
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
    flags: '-eid, --electionId <string>',
    description: `Id to use for returned data`,
  })
  id(val: string): string {
    return val;
  }

  // @Option({
  //   flags: '-s, --agency-shortcut [string]',
  //   description: `Code used to determine which agency to return data for`,
  // }) // Not used for SD eFile but will be required for NetFile.
  // shortcut(val: string): string {
  //   return val;
  // }

  @Option({
    flags: '-e, --election-date <string>',
    description: `Code used to determine which election date to return data for`,
  }) // Not used for SD eFile but will be required for NetFile.
  date(val: string): string {
    return val;
  }
}
