import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
// assets
import '../styles/globals.scss';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}
