// libs
import Head from 'next/head'

// components
import { Button, H4, Paragraph } from "../components/common";

export default function Home() {
  return (
    <>
      <Head>
        <title>Login | Deep Render Cloud</title>
        <meta name="description" content="Login | Deep Render Cloud" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section>
          <div className='container'>
            <div className='min-h-screen flex items-center justify-center'>
              <div className='bg-[#2F2F2F] rounded py-7 sm:py-14 px-5 sm:px-10 w-full max-w-[420px] text-center'>
                <img className='w-[116px] mx-auto mb-6' src={'/logo.svg'} alt='' />
                <H4>Welcome Back</H4>
                <Paragraph classname='text-base text-[#A4A4A4]'>
                  Login to your account
                </Paragraph>
                <div className='mt-12'>
                  <Button size='big' color='grey' icon='/google.svg' classname="w-full mb-8">
                    Login with Google
                  </Button>
                  <Button size='big' color='grey' icon='/github.svg' classname="w-full">
                    Login with Github
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
