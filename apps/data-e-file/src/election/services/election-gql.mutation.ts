import gql from 'graphql-tag';

export const CREATE_ELECTIONS = gql`
  mutation Mutation($input: ElectionInput) {
    createElections(input: $input) {
      id
      date
      type
      agencyId
    }
  }
`;

// https://www.npmjs.com/package/graphql-request ? option
// https://stackoverflow.com/questions/40792344/does-apollo-client-work-on-node-js
