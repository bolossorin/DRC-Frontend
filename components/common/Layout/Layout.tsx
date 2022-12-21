// libs
import Head from "next/head";

// components
import { SideBar } from "../SideBar/SideBar";
import { useWindowSize } from "../../../utility/useWindowSize";

// assets
import styles from './Layout.module.scss'

interface ILayout {
  title: string
  description: string
  children: any
}

export const Layout = ({ title, description, children }: ILayout) => {
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
          {children}
        </main>
      </div>
    </>
  )
}