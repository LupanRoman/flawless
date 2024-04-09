"use client";
import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useAppDispatch } from "@/redux/store";
import CreateTaskBtn from "@/redux/features/handleTasks/createTaskBtn";
type Props = {};

function HandleActions({}: Props) {
  const dispatch = useAppDispatch();
  const [showActions, setShowActions] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setShowActions(!showActions);
        }}
        className="absolute -top-8 cursor-pointer rounded-full bg-brandColor px-2 py-2 font-medium md:static md:rounded-lg"
      >
        <p className="hidden md:flex">Create</p>
        <p className="flex md:hidden">
          <AddRoundedIcon />
        </p>
      </div>
      {showActions ? (
        <div className="absolute -top-32 flex flex-col items-start gap-4 rounded-lg bg-2BG px-2 py-2">
          {/* <CreateTaskBtn /> */}
          <button>Create group</button>
          <button>Add member</button>
        </div>
      ) : null}
    </>
  );
}

export default HandleActions;
