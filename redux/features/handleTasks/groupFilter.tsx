"use client";
import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

type Props = {};

function GroupFilter({}: Props) {
  const [openGroupLabels, setOpenGroupLabels] = useState(false);
  return (
    <>
      <div className="relative w-fit">
        <div
          onClick={() => {
            setOpenGroupLabels(!openGroupLabels);
          }}
          className="flex w-[150px] cursor-pointer items-center justify-between rounded-lg bg-2BG px-2 py-1"
        >
          <p className="text-sm">Group</p>
          {openGroupLabels ? (
            <p className="rotate-180 duration-700">
              <ExpandMoreRoundedIcon />
            </p>
          ) : (
            <p className="rotate-0 duration-700">
              <ExpandMoreRoundedIcon />
            </p>
          )}
        </div>
        {openGroupLabels ? (
          <div className="absolute left-0 right-0 top-12 flex flex-col items-start gap-2 rounded-lg bg-3BG px-2 py-2">
            <button className="text-sm">Create group</button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default GroupFilter;
