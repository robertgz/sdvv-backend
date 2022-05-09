import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ElectionModule } from './election/election.module';
import { ElectionYearsModule } from './election-years/election-years.module';
import { OfficesModule } from './offices/offices.module';
import { CandidateModule } from './candidate/candidate.module';
import { CommitteeModule } from './committee/committee.module';
import { ContributionsModule } from './contributions/contributions.module';
import { ExpensesModule } from './expenses/expenses.module';
import { IndependentExpendituresModule } from './independent-expenditures/independent-expenditures.module';
import { LastUpdateModule } from './last-update/last-update.module';
import { MSGraphQLModule } from './_multi_source/ms-graphql.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => {
        const API_KEY = process.env.GQL_AUTH_API_KEY;
        if (!API_KEY) return { role: '' };

        const token = req.headers.authorization || '';
        const role = token === API_KEY ? 'updater' : '';
        return { role };
      },
    }),
    ElectionModule,
    ElectionYearsModule,
    OfficesModule,
    CandidateModule,
    CommitteeModule,
    ContributionsModule,
    ExpensesModule,
    IndependentExpendituresModule,
    LastUpdateModule,
    MSGraphQLModule,
  ],
})
export class GraphQLSetupModule {}
