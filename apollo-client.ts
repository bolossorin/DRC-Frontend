import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, split, FetchResult, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition, Observable } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLError } from "graphql";

const httpLink = createHttpLink({
  uri: process.env.BACKEND_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Session: {
        fields: {
          gpu_log: {
            merge: true,
          },
        },
      },
    },
  }),
});

let retryCount = 0;

let isConnected = true;

const errorLink = onError(({ networkError, forward, operation }) => {
  if (networkError?.message === "Response not successful: Received status code 401") {
    const observable = new Observable<FetchResult<Record<string, any>>>((observer) => {
      (async () => {
        try {
          const { accessToken } = await fetch(window.location.origin + "/api/auth/refresh").then((res) => res.json());

          if (!accessToken) {
            throw new GraphQLError("Empty AccessToken");
          }

          setApolloAuthToken(accessToken);

          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          };

          // Retry the failed request
          forward(operation).subscribe(subscriber);
        } catch (err) {
          retryCount++;
          if (retryCount < 5) {
            setTimeout(() => {
              forward(operation).subscribe(observer);
            }, 5000);
          } else {
            observer.error(err);
          }
        }
      })();
    });

    return observable;
  }
  else if (networkError) {
    console.log('Network error detected. Attempting to reconnect...');
    isConnected = false; 

    const tryReconnect = async () => {
      if (!isConnected) { 
        console.log('Starting reconnection attempt...'); 
        await configureApolloClient();
        setTimeout(tryReconnect, 5000); // Wait 5 seconds before the next reconnection attempt
      }
    };

    tryReconnect(); // Start the reconnection attempts
  }

});



const setApolloAuthToken = (accessToken: string) => {
  const wsLink = new GraphQLWsLink(
    createClient({
      lazy: true,
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

  client.setLink(ApolloLink.from([errorLink, link]));
};

export const configureApolloClient = async () => {
  try {
    const { accessToken } = await fetch(window.location.origin + "/api/auth/token").then((res) => res.json());
    setApolloAuthToken(accessToken);
    isConnected = true;
    console.log('Connection to websocket server successful!'); 
  } catch (error) {
    isConnected = false; 
    console.log('Reconnection failed. Will retry.'); 
  }
};



export default client;
