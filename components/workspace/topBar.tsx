"use client";
import React, { useEffect, useState } from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  controlProjectModalValue,
  handleControlProjectModal,
} from "@/redux/features/handleProjects/handleProjectSlice";
import ControlProject from "@/redux/features/handleProjects/controlProject";
import EditProjectModal from "@/redux/features/handleProjects/editProjectModal";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

type Props = {
  user: User;
};

function TopBar({ user }: Props) {
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

  const dispatch = useAppDispatch();
  const controlProjectModalState = useAppSelector(controlProjectModalValue);

  const [currentProjectID, setCurrentProjectID] = useState(Number);
  useEffect(() => {
    const projectID = JSON.parse(localStorage.getItem("projectID") || "");
    setCurrentProjectID(projectID);
    console.log(user);
  }, []);

  return (
    <>
      <div className="flex h-[10svh] w-full items-center justify-end px-4 md:px-8 lg:h-full lg:justify-between">
        <div className="hidden flex-col text-sm font-medium lg:flex">
          <h2>{greeting}</h2>
          <p className="text-lg">{user.user_metadata.full_name}</p>
        </div>
        <div className="relative flex items-center justify-center gap-5">
          <button
            className="relative"
            onClick={() => {
              dispatch(handleControlProjectModal(!controlProjectModalState));
            }}
          >
            <Image
              src={user.user_metadata.picture}
              width={30}
              height={30}
              alt="user profile picture"
              className="rounded-full"
            />
            {/* <SettingsRoundedIcon /> */}
            <ControlProject />
          </button>
          <Link href={"/hub"}>
            <button>
              <LogoutRoundedIcon />
            </button>
          </Link>
          {/* <EditProjectModal projectID={currentProjectID} /> */}
        </div>
      </div>
    </>
  );
}

export default TopBar;
