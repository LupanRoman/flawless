import React from 'react';
import Link from 'next/link';

type Props = {};

function NavBar({}: Props) {
  return (
    <>
      <div className="flex h-[10vh] items-center justify-between border-b-2 border-gray-600">
        <h1 className="pl-10 text-3xl font-bold">Flawless</h1>
        {/* <div className="flex items-center gap-7 text-xl font-normal">
          <button>Features</button>
          <button>Pricing</button>
          <button>About</button>
        </div> */}
        <div className="flex items-center gap-7 pr-10">
          <Link href={'/auth/signUp'}>
            <button className="rounded-[10px] bg-brandColor px-5 py-[10px] text-xl font-bold">
              Sign up
            </button>
          </Link>
          <Link href={'/auth/login'}>
            <button className="rounded-[10px] bg-secondaryBG px-5 py-[10px] text-xl font-bold">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;
