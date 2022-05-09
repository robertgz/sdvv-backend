import gql from 'graphql-tag';

export const CREATE_AGENCIES = gql`
  mutation Mutation($input: AgencyInput) {
    createAgencies(input: $input) {
      id
      shortcut
      name
      source
    }
  }
`;

// https://www.npmjs.com/package/graphql-request ? option
// https://stackoverflow.com/questions/40792344/does-apollo-client-work-on-node-js
