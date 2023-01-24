import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client';
// assets
import '../styles/globals.scss'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
