import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AgencyModuleMS } from './agency/agency.module';
import { ElectionModuleMS } from './election/election.module';
import { CandidateModuleMS } from './candidate/candidate.module';
import { CandidateInfoModuleMS } from './candidate-info/candidate-info.module';
import { ContributionsModuleMS } from './contribution-transaction/contribution.module';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   definitions: {
    //     path: join(process.cwd(), 'src/graphql.ts'),
    //   },
    //   playground: false,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    //   context: ({ req }) => {
    //     const API_KEY = process.env.GQL_AUTH_API_KEY;
    //     if (!API_KEY) return { role: '' };

    //     const token = req.headers.authorization || '';
    //     const role = token === API_KEY ? 'updater' : '';
    //     return { role };
    //   },
    // }),
    AgencyModuleMS,
    ElectionModuleMS,
    CandidateModuleMS,
    CandidateInfoModuleMS,
    ContributionsModuleMS,
  ],
})
export class MSGraphQLModule {}
