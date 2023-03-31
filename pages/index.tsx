// libs
import Head from 'next/head'
import { useEffect } from "react";
import { useRouter } from "next/router";

// components
import { routes } from "@/utility/routes";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(routes.vessels)
  }, [])

  return (
    <>
      <Head>
        <title>Home | Deep Render Cloud</title>
        <meta name="description" content="Home | Deep Render Cloud" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section>
          <div className='container' />
        </section>
      </main>
    </>
  )
}
