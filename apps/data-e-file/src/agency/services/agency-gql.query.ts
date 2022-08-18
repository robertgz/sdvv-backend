import gql from 'graphql-tag';

export const GET_AGENCIES = gql`
  query Query($input: AgencyInput) {
    agencies(input: $input) {
      source
      shortcut
      name
    }
  }
`;

// https://www.npmjs.com/package/graphql-request ? option
// https://stackoverflow.com/questions/40792344/does-apollo-client-work-on-node-js
