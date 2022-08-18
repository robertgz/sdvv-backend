import gql from 'graphql-tag';

export const REPLACE_TRANSACTIONS = gql`
  mutation Mutation($input: TransactionInput) {
    createContribution(input: $input) {
      id
    }
  }
`;

// https://www.npmjs.com/package/graphql-request ? option
// https://stackoverflow.com/questions/40792344/does-apollo-client-work-on-node-js
