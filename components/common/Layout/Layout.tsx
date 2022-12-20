// libs
import Head from "next/head";

// components
import { SideBar } from "../SideBar/SideBar";

// assets
import styles from './Layout.module.scss'

interface ILayout {
  title: string
  description: string
  children: any
}

export const Layout = ({ title, description, children }: ILayout) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.layout}>
        <SideBar />
        <main>
          {children}
        </main>
      </div>
    </>
  )
}