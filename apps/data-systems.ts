export interface Action {
  command: string;
  options?: [string];
}

export interface System {
  name: string;
  // registerActions / registerSystem?: Action;
  updateAgencies?: Action; // Fetch a List of cities the system supports and perform a GraphQL mutation to the primary API
}

// or data-source?
// export const source: [source] = [
export const system: [System] = [
  {
    name: 'eFile',
    updateAgencies: {
      command: 'agency-update',
    },
  },
];
