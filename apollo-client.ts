import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://staging.vessels.deeprender.ai/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const setApolloAuthToken = async () => {
  const { accessToken } = await fetch('http://localhost:3000/api/auth/token').then((res) => res.json());

  const link = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  })).concat(httpLink);

  client.setLink(link);
};

setApolloAuthToken();

export default client;
