import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const httpLink = createHttpLink({
  uri: process.env.BACKEND_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const setApolloAuthToken = async () => {
  const { accessToken } = await fetch(window.location.origin + "/api/auth/token").then((res) => res.json());

  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.WEBSOCKET_URL as string,
      connectionParams: {
        token: accessToken ? `Bearer ${accessToken}` : "",
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    httpLink
  );

  const link = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  })).concat(splitLink);

  client.setLink(link);
};

export default client;
