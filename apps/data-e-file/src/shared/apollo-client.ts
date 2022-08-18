import { Injectable } from '@nestjs/common';

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core';

import fetch from 'cross-fetch';

@Injectable()
export class ApolloClientService {
  private token = process.env.GQL_AUTH_API_KEY;

  public getApolloClient(apiURL: string) {
    return new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: apiURL,
        fetch,
        credentials: 'same-origin',
        headers: {
          authorization: this.token ? `${this.token}` : '',
        },
      }),
      cache: new InMemoryCache(),
    });
  }
}
