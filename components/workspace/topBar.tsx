"use client";
import React, { useEffect, useState } from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Link from "next/link";

type Props = {};

function TopBar({}: Props) {
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours <= 10 && hours >= 6) {
      setGreeting("Good morning");
    } else if (hours >= 10 && hours <= 17) {
      setGreeting("Good day");
    } else if (hours >= 17) {
      setGreeting("Good afternoon");
    }
  }, []);

  return (
    <>
      <div className="flex h-[10svh] w-full items-center justify-end px-4 lg:h-full lg:justify-between lg:px-8">
        <div className="hidden flex-col lg:flex ">
          <h1 className="text-lg font-medium">{greeting}</h1>
        </div>
        <div className="flex items-end justify-center">
          <Link href={"/hub"}>
            <button>
              <LogoutRoundedIcon />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TopBar;
