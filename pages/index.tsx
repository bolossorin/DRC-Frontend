// libs
import Head from 'next/head'

export default function Home() {
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
          <div className='container'>
            <h1>section 1</h1>
          </div>
        </section>
      </main>
    </>
  )
}
