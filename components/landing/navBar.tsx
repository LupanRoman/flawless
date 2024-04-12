import React from "react";
import Link from "next/link";

type Props = {};

function NavBar({}: Props) {
  return (
    <>
      <div className="flex h-[10vh] items-center justify-between border-b-2 border-gray-600 px-4">
        <h1 className="font-bold md:pl-10 md:text-3xl">Flawless</h1>
        <div className="flex items-center gap-4 md:gap-7 md:pr-10">
          <Link href={"/auth/signUp"}>
            <button className="rounded-[10px] bg-gradient-to-r from-gradientLeft to-gradientRight px-3 py-1 font-medium md:px-5 md:py-[10px] md:text-base">
              Get started
            </button>
          </Link>
          <Link href={"/auth/login"}>
            <button className="rounded-[10px] bg-2BG px-3 py-1 font-medium md:px-5 md:py-[10px] md:text-base">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;
