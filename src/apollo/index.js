import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

const cache = new InMemoryCache();

const httpLink = new createUploadLink({
  uri: 'https://buttercup.conextion.com/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('auth_token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  resolvers: {},
});

export default client;
