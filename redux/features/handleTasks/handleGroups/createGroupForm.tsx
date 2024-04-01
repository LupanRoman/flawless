"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

type Props = {
  setCreateGroupForm: (value: boolean) => void;
};

function CreateGroupForm({ setCreateGroupForm }: Props) {
  const [groupTitle, setGroupTitle] = useState("");
  const [currentProjectID, setCurrentProjectID] = useState(Number);

  useEffect(() => {
    const projectID = JSON.parse(localStorage.getItem("projectID") || "");
    setCurrentProjectID(projectID);
  }, []);

  const createGroup = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Groups")
      .insert([{ group_title: groupTitle, project_id: currentProjectID }])
      .select();
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 top-0 z-30 flex flex-col justify-between rounded-lg bg-3BG">
        <input
          type="text"
          placeholder="Group name"
          className="mx-2 mt-2 rounded-lg bg-4BG indent-2 text-textColor outline-none"
          onChange={(e) => {
            setGroupTitle(e.target.value);
          }}
        />
        <div className="flex w-full items-center justify-end gap-3 pb-2 pr-2">
          <button
            onClick={() => {
              createGroup();
              setCreateGroupForm(false);
            }}
            className="rounded-lg bg-4BG px-3 py-1 text-sm font-medium"
          >
            Add
          </button>
          <button
            onClick={() => {
              setCreateGroupForm(false);
            }}
            className="text-sm font-medium text-textColor/50"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateGroupForm;
