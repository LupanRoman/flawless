import Link from "next/link";
import React from "react";

type Props = {};

function Welcome({}: Props) {
  return (
    <>
      <div className="flex h-[80svh] flex-col justify-between pt-44 text-center md:h-[90svh] md:pt-32">
        <div className="flex flex-col gap-10 md:gap-5 ">
          <div className="text-2xl font-bold md:text-5xl">
            <h1>
              Get{" "}
              <span className="bg-gradient-to-r from-gradientLeft to-gradientRight bg-clip-text text-transparent">
                started fast
              </span>{" "}
              and
            </h1>
            <h1 className="bg-gradient-to-r from-gradientLeft to-gradientRight bg-clip-text text-transparent">
              manage your projects with ease
            </h1>
          </div>
          <div className="font-medium md:text-2xl">
            <h2>
              Simple, fast and easy to set up project management tool, just sign
              up and start making progress.
            </h2>
          </div>
        </div>
        <Link href={"/auth/signUp"} className="pb-32">
          <button className="rounded-lg bg-gradient-to-r from-gradientLeft to-gradientRight px-10 py-3 text-xl md:py-5 font-semibold md:text-3xl">
            Start managing projects
          </button>
        </Link>
      </div>
    </>
  );
}

export default Welcome;
