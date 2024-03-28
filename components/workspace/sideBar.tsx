"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";

type Props = {};

function SideBar({}: Props) {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [currentProjectID, setCurrentProjectID] = useState(Number);

  useEffect(() => {
    const projectID = JSON.parse(localStorage.getItem("projectID") || "");
    setCurrentProjectID(projectID);
  }, []);
  return (
    <>
      <div className="bg-secondaryBG flex items-center justify-around py-5 lg:h-full lg:max-w-[200px] lg:flex-col lg:items-start lg:justify-normal lg:gap-5 lg:px-3 lg:py-0 lg:pt-20">
        <Link
          onClick={() => {
            console.log(currentProjectID);
            setActiveLink("Dashboard");
          }}
          href={`/workspace/${currentProjectID}/dashboard`}
          className={`${
            activeLink == "Dashboard" ? "bg-brandColor" : "bg-transparent"
          } rounded-full px-[20px] py-[10px] lg:w-full lg:rounded-lg lg:px-4`}
        >
          <button className="items-center gap-2 text-xl font-semibold lg:flex">
            <SpaceDashboardOutlinedIcon />
            <p className="hidden lg:flex">Dashboard</p>
          </button>
        </Link>
        <Link
          href={`/workspace/${currentProjectID}/tasks`}
          onClick={() => {
            console.log(currentProjectID);

            setActiveLink("Tasks");
          }}
          className={`${
            activeLink == "Tasks" ? "bg-brandColor" : "bg-transparent"
          } rounded-full px-[20px] py-[10px] lg:w-full lg:rounded-lg lg:px-4`}
        >
          <button className="items-center gap-2 text-xl font-semibold lg:flex">
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
          } rounded-full px-[20px] py-[10px] lg:w-full lg:rounded-lg lg:px-4`}
        >
          <button className="items-center gap-2 text-xl font-semibold lg:flex">
            <DonutLargeRoundedIcon />
            <p className="hidden lg:flex">Analytics</p>
          </button>
        </Link>
      </div>
    </>
  );
}

export default SideBar;
