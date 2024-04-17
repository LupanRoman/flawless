"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import HandleActions from "./handleActions";
import CreateGroupForm from "@/redux/features/handleTasks/handleGroups/createGroupForm";

type Props = {};

function SideBar({}: Props) {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [currentProjectID, setCurrentProjectID] = useState(Number);

  useEffect(() => {
    const projectID = JSON.parse(localStorage.getItem("projectID") || "");
    setCurrentProjectID(projectID);
  }, []);
  // TODO Create a new file and create a link component => send props to that link and render here to make the code cleaner
  return (
    <>
      <div className="relative flex items-center justify-center bg-2BG py-5 lg:h-full lg:max-w-[200px] lg:flex-col lg:items-start lg:justify-normal lg:gap-5 lg:px-3 lg:py-0">
        <div className="flex w-full items-center justify-around lg:h-full lg:max-w-[200px] lg:flex-col lg:items-start lg:justify-normal lg:gap-5 lg:px-2 lg:py-0 lg:pt-20">
          <Link
            onClick={() => {
              setActiveLink("Dashboard");
            }}
            href={`/workspace/${currentProjectID}/dashboard`}
            className={`${
              activeLink == "Dashboard" ? "bg-brandColor" : "bg-transparent"
            } rounded-full px-[20px] py-[6px] lg:w-full lg:rounded-lg lg:px-4`}
          >
            <button className="items-center gap-2 text-sm font-medium lg:flex">
              <SpaceDashboardOutlinedIcon />
              <p className="hidden lg:flex">Dashboard</p>
            </button>
          </Link>
          <Link
            href={`/workspace/${currentProjectID}/tasks`}
            onClick={() => {
              setActiveLink("Tasks");
            }}
            className={`${
              activeLink == "Tasks" ? "bg-brandColor" : "bg-transparent"
            } rounded-full px-[20px] py-[6px] lg:w-full lg:rounded-lg lg:px-4`}
          >
            <button className="items-center gap-2 text-sm font-medium  lg:flex">
              <CheckCircleOutlineRoundedIcon />
              <p className="hidden lg:flex">Tasks</p>
            </button>
          </Link>
          <Link
            href={`/workspace/${currentProjectID}/analytics`}
            onClick={() => {
              setActiveLink("Analytics");
            }}
            className={`${
              activeLink == "Analytics" ? "bg-brandColor" : "bg-transparent"
            } rounded-full px-[20px] py-[6px] lg:w-full lg:rounded-lg lg:px-4`}
          >
            <button className="items-center gap-2 text-sm font-medium  lg:flex">
              <DonutLargeRoundedIcon />
              <p className="hidden lg:flex">Analytics</p>
            </button>
          </Link>
        </div>
        <div className="absolute -top-7 flex w-[200px] items-center justify-center md:relative md:w-full md:pb-14">
          <HandleActions />
          <CreateGroupForm />
        </div>
      </div>
    </>
  );
}

export default SideBar;
