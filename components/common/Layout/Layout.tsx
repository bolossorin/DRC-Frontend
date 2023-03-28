import React, { useEffect } from "react";

// libs
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import Router from "next/router";

// components
import { Header, LoadingSpinner } from "@/components/common";
import { routes } from "@/utility/routes";

// assets
import styles from './Layout.module.scss'

interface ILayout {
  title: string
  description: string
  label: any
  children: any
}

export const Layout = ({ title, description, children, label }: ILayout) => {
  const { isLoading, user }:any = useUser();

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
      {user && <div className={`${styles.layout} grow`}>
        <main>
          <div className='container'>
            <div className='flex flex-col min-h-screen py-10 md:px-4'>
              <Header label={label} />
              <section className='border border-[#535353] bg-[#282828] flex-1 flex flex-col rounded'>
                {children}
              </section>
            </div>
          </div>
        </main>
      </div>}
    </>
  )
}