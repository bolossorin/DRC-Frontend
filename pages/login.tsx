import React, { useEffect } from "react";
// libs
import Head from "next/head";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";

// components
import { Button, H4, LoadingSpinner, Paragraph } from "@/components/common";
import { routes } from "@/utility/routes";

export default function Home() {
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && user) {
      Router.push(routes.vessels);
    }
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>Login | Deep Render Cloud</title>
        <meta name="description" content="Login | Deep Render Cloud" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      {isLoading && <LoadingSpinner />}
      {!user && (
        <main className="grow">
          <section>
            <div className="container">
              <div className="min-h-screen flex items-center justify-center">
                <div className="bg-[#2F2F2F] rounded py-7 sm:py-14 px-5 sm:px-10 w-full max-w-[420px] text-center">
                  <img
                    className="w-[116px] mx-auto mb-6"
                    src={"/logo.svg"}
                    alt=""
                  />
                  <H4>Welcome Back</H4>
                  <Paragraph classname="text-base text-[#A4A4A4]">
                    Login to your account
                  </Paragraph>
                  <div className="mt-12">
                    <Button
                      onClick={() => Router.push("/api/auth/login")}
                      size="big"
                      color="grey"
                      icon="/google.svg"
                      classname="w-full"
                    >
                      Login with Google
                    </Button>
                    {/*<Button size='big' color='grey' icon='/github.svg' classname="w-full">
                    Login with Github
                  </Button>*/}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
