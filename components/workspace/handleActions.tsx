"use client";
import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import CreateTaskBtn from "@/redux/features/handleTasks/createTaskBtn";
import {
  createGroupModalValue,
  handleCreateTaskGroupModal,
  handleWorkspaceActions,
  workspaceActionsModalState,
} from "@/redux/features/handleTasks/handleTasksSlice";
type Props = {};

function HandleActions({}: Props) {
  const dispatch = useAppDispatch();
  const workspaceActions = useAppSelector(workspaceActionsModalState);
  const createGroupModal = useAppSelector(createGroupModalValue);
  return (
    <>
      <div
        onClick={() => {
          dispatch(handleWorkspaceActions(!workspaceActions));
        }}
        className="relative cursor-pointer rounded-full bg-brandColor px-4 py-1 text-sm font-medium md:static md:rounded-lg"
      >
        <p className="hidden md:flex">Create</p>
        <p className="flex md:hidden">
          <AddRoundedIcon />
        </p>

        {workspaceActions ? (
          <div className="absolute -left-20 -top-20 flex w-[200px] flex-col items-start gap-2 rounded-lg bg-3BG px-2 py-2 md:-top-20 md:left-0 md:w-full">
            <div className="w-full flex">
              <CreateTaskBtn renderedIn="sideBar" />
            </div>
            <button
              onClick={() => {
                dispatch(handleCreateTaskGroupModal(!createGroupModal));
              }}
              className="w-full rounded-lg px-2 py-1 text-start text-xs font-medium hover:bg-4BG"
            >
              Create group
            </button>
            {/* <button className="rounded-lg px-2 py-1 text-start text-xs font-medium hover:bg-4BG">
            Add member
          </button> */}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default HandleActions;
