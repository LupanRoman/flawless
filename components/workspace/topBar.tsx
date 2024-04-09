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

  const dispatch = useAppDispatch();
  const controlProjectModalState = useAppSelector(controlProjectModalValue);

  const [currentProjectID, setCurrentProjectID] = useState(Number);
  useEffect(() => {
    const projectID = JSON.parse(localStorage.getItem("projectID") || "");
    setCurrentProjectID(projectID);
  }, []);

  return (
    <>
      <div className="flex h-[10svh] w-full items-center justify-end px-4 lg:h-full lg:justify-between lg:px-8">
        <div className="hidden flex-col lg:flex ">
          <h1 className="text-lg font-medium">{greeting}</h1>
        </div>
        <div className="relative flex items-end justify-center gap-5 opacity-50">
          <button
            onClick={() => {
              dispatch(handleControlProjectModal(!controlProjectModalState));
            }}
          >
            <SettingsRoundedIcon />
          </button>
          <Link href={"/hub"}>
            <button>
              <LogoutRoundedIcon />
            </button>
          </Link>
          <ControlProject />
          <EditProjectModal projectID={currentProjectID} />
        </div>
      </div>
    </>
  );
}

export default TopBar;
