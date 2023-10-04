/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Dashbroad</title>
      </Head>

      <div className="flex justify-between">
        <h2>
          Hello,<span className="font-medium"> {session?.user?.name}</span>
        </h2>
        <div className="flex bg-gray-300 text-black rounded-lg overflow-hidden">
          <img src={session?.user?.image} alt="" className="w-6 h-6" />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </>
  );
}
