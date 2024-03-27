"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import {
  createProjectModalState,
  handleCreateProjectModal,
} from "./handleProjectSlice";

type Props = {};

function CreateProjectBtn({}: Props) {
  const dispatch = useAppDispatch();
  const createProjectModalValue = useAppSelector(createProjectModalState);
  return (
    <>
      <button
        onClick={() => {
          dispatch(handleCreateProjectModal(!createProjectModalValue));
        }}
        className="rounded-[10px] bg-brandColor px-5 py-2 text-base font-bold"
      >
        Create project
      </button>
    </>
  );
}

export default CreateProjectBtn;
