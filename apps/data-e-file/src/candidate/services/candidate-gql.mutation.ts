import gql from 'graphql-tag';

export const CREATE_CANDIDATES = gql`
  mutation Mutation($input: CandidateInput) {
    createCandidates(input: $input) {
      id
    }
  }
`;

// https://www.npmjs.com/package/graphql-request ? option
// https://stackoverflow.com/questions/40792344/does-apollo-client-work-on-node-js
