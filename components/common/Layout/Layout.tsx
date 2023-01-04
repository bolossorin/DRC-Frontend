import React from "react";

// libs
import Head from "next/head";

// components
import { SideBar, Header } from "../../common";
import { useWindowSize } from "../../../utility/useWindowSize";

// assets
import styles from './Layout.module.scss'

interface ILayout {
  title: string
  description: string
  label: any
  children: any
}

export const Layout = ({ title, description, children, label }: ILayout) => {
  const { width } = useWindowSize();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.layout}>
        {width > 1024 && <SideBar />}
        <main>
          <div className='container'>
            <div className='flex flex-col min-h-screen py-10 md:px-10'>
              <Header label={label} />
              <section className='border border-[#535353] bg-[#282828] flex-1 flex flex-col rounded'>
                {children}
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}