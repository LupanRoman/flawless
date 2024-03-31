"use client";
import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  createTaskModalValue,
  handleCreateTaskModalState,
} from "./handleTasksSlice";
type Props = {};

function CreateTaskBtn({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <div>
        <button
          onClick={() => {
            dispatch(handleCreateTaskModalState(true));
          }}
          className="rounded-xl bg-brandColor px-2 py-2"
        >
          <AddRoundedIcon />
        </button>
      </div>
    </>
  );
}

export default CreateTaskBtn;
