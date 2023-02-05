import type { NextPage } from "next";
import Head from "next/head";
import Dashboard from "../components/dashboard";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ICON Contract Caller</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ec0047] to-[#92004e]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            ICON Contract Caller
          </h1>
          <Dashboard />
        </div>
      </main>
    </>
  );
};

export default Home;
