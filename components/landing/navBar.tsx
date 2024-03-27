import React from 'react';
import Link from 'next/link';

type Props = {};

function NavBar({}: Props) {
  return (
    <>
      <div className="flex h-[10vh] px-4 items-center justify-between border-b-2 border-gray-600">
        <h1 className="md:pl-10 md:text-3xl font-bold">Flawless</h1>
        <div className="flex items-center md:gap-7 gap-4 md:pr-10">
          <Link href={'/auth/signUp'}>
            <button className="rounded-[10px] bg-brandColor md:px-5 px-3 py-2 md:py-[10px] md:text-xl font-bold">
              Sign up
            </button>
          </Link>
          <Link href={'/auth/login'}>
            <button className="rounded-[10px] bg-2BG md:px-5 px-3 py-2 md:py-[10px] md:text-xl font-bold">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;
