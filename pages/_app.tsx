import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ApolloProvider } from "@apollo/client";
import client, { setApolloAuthToken } from "../apollo-client";
import { useEffect, useState } from "react";
// assets
import "../styles/globals.scss";
import { LoadingSpinner } from "../components/common";
import { RegionContextProvider } from "../context/region";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { user } = pageProps;

  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("");

  useEffect(() => {
    const initialize = async () => {
      try {
        await setApolloAuthToken();
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    initialize();

    const regionData = localStorage.getItem("region");
    if (regionData) {
      setRegion(regionData);
    }
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <UserProvider user={user}>
      <ApolloProvider client={client}>
        <RegionContextProvider initRegion={region}>
          <Component {...pageProps} />
        </RegionContextProvider>
      </ApolloProvider>
    </UserProvider>
  );
}
