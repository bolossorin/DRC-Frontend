import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.BACKEND_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const setApolloAuthToken = async () => {
  const { accessToken } = await fetch(window.location.origin + "/api/auth/token").then((res) => res.json());

  const link = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  })).concat(httpLink);

  client.setLink(link);
};

export default client;
