"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import {
  createGroupModalValue,
  handleCreateTaskGroupModal,
} from "../handleTasksSlice";

type Props = {};

function CreateGroupForm({}: Props) {
  const [groupTitle, setGroupTitle] = useState("");
  const [currentProjectID, setCurrentProjectID] = useState(Number);
  const createGroupModal = useAppSelector(createGroupModalValue);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const projectID = JSON.parse(localStorage.getItem("projectID") || "");
    setCurrentProjectID(projectID);
  }, []);

  const createGroup = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Groups")
      .insert([{ title: groupTitle, project_id: currentProjectID }])
      .select();
  };

  return createGroupModal ? (
    <>
      <div className="absolute -top-28 left-0 right-0 z-30 flex h-[100px] flex-col justify-between rounded-lg bg-3BG">
        <input
          type="text"
          placeholder="Group name"
          className="mx-2 mt-2 rounded-lg bg-4BG indent-2 text-sm font-medium text-textColor outline-none"
          onChange={(e) => {
            setGroupTitle(e.target.value);
          }}
        />
        <div className="flex w-full items-center justify-end gap-3 pb-2 pr-2">
          <button
            onClick={() => {
              createGroup();
              dispatch(handleCreateTaskGroupModal(!createGroupModal));
            }}
            className="rounded-lg bg-4BG px-3 py-1 text-sm font-medium"
          >
            Add
          </button>
          <button
            onClick={() => {
              dispatch(handleCreateTaskGroupModal(!createGroupModal));
            }}
            className="text-sm font-medium text-textColor/50"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  ) : null;
}

export default CreateGroupForm;
