"use client";
import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  createTaskModalValue,
  handleCreateTaskModalState,
  handleWorkspaceActions,
  workspaceActionsModalState,
} from "./handleTasksSlice";
type Props = {
  renderedIn: string;
};

function CreateTaskBtn({ renderedIn }: Props) {
  const dispatch = useAppDispatch();
  const workspaceActions = useAppSelector(workspaceActionsModalState);
  
  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => {
          dispatch(handleCreateTaskModalState(true));
        }}
      >
        {renderedIn == "tasksPage" ? (
          <button className="rounded-xl bg-brandColor px-2 py-2">
            <AddRoundedIcon />
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(handleWorkspaceActions(!workspaceActions));
            }}
            className="rounded-lg px-2 py-1 text-start text-xs font-medium hover:bg-4BG"
          >
            Create task
          </button>
        )}
      </div>
    </>
  );
}

export default CreateTaskBtn;
