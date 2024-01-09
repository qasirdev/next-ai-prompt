"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { setEngine } from "crypto";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    // <div className="flex-between flex-col w-full mb-16 pt-3">
    //   <div className="flex gap-2 flex-center">
    //     <Link href="/" className="flex gap-2 flex-center">
    //         <Image
    //           src="/assets/images/favicon.ico"
    //           alt="logo"
    //           width={30}
    //           height={30}
    //           className="object-contain"
    //         />
    //         <p className="logo_text">AI Prompt With Next 14</p>

    //     </Link>
    //   </div>
    //   <div className="flex gap-2 flex-start">
    //     <Link href="http://www.qasir.co.uk/" target="_blank" className="logo_text text-slate-300"> by qasir.co.uk</Link>
    //   </div>
    // </div>

    <nav className="flex-between w-full mb-16 pt-3">
      <div className="flex-between flex-col">
      <div className="flex gap-2 flex-center">
        <Link href="/" className="flex gap-2 flex-center">
            <Image
              src="/assets/images/favicon.ico"
              alt="logo"
              width={30}
              height={30}
              className="object-contain"
            />
            <p className="logo_text">AI Prompt With Next 14</p>

        </Link>
      </div>
      <div className="flex gap-2 flex-start">
        <Link href="http://www.qasir.co.uk/" target="_blank" className="logo_text !text-blue-500 hover:!text-yellow-500"> by qasir.co.uk</Link>
      </div>
    </div>
      {/* <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/favicon.ico"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">AI Prompt With Next 14</p>
      </Link>
      <Link href="http://www.qasir.co.uk/" target="_blank" className="flex gap-2 flex-start">
        <p className="logo_text text-slate-300"> by qasir.co.uk</p>
      </Link> */}
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={async () => {
                await signOut();
              }}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image as string}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={async (id) => {
                    await signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image as string}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
