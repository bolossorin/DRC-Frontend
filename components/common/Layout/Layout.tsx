import React, { useEffect } from "react";

// libs
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import Router from "next/router";

// components
import { Header, LoadingSpinner } from "@/components/common";
import { routes } from "@/utility/routes";

interface ILayout {
  title: string
  description: string
  label: any
  children: any
}

export const Layout = ({ title, description, children, label }: ILayout) => {
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      Router.push(routes.login);
    }
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && <LoadingSpinner />}
      {user && <main className='py-10 grow md:px-4 w-full'>
        <Header label={label} />
        <section className='border border-[#535353] bg-[#282828] rounded'>
          {children}
        </section>
      </main>
      }
    </>
  )
}