"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import {
  controlProjectModalValue,
  handleControlProjectModal,
  handleEditProjectModal,
} from "./handleProjectSlice";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type Props = {};

function ControlProject() {
  const dispatch = useAppDispatch();
  const controlProjectModalState = useAppSelector(controlProjectModalValue);
  const [currentProjectID, setCurrentProjectID] = useState(Number);

  useEffect(() => {
    const projectID = JSON.parse(localStorage.getItem("projectID") || "");
    setCurrentProjectID(projectID);
  }, []);

  const deleteProject = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("Projects")
      .delete()
      .eq("id", currentProjectID);
  };

  return (
    <>
      {controlProjectModalState ? (
        <div className="absolute right-8 top-10 flex w-[200px] flex-col items-start gap-3 rounded-lg bg-2BG px-2 py-2 text-sm font-medium">
          <button
            className="w-full rounded-lg px-2 py-1 text-start hover:bg-3BG"
            onClick={() => {
              dispatch(handleEditProjectModal(true));
              dispatch(handleControlProjectModal(!controlProjectModalState));
            }}
          >
            Edit project
          </button>
          <Link
            className="w-full rounded-lg px-2 py-1 text-start hover:bg-3BG"
            href={`/hub`}
            onClick={() => {
              dispatch(handleControlProjectModal(!controlProjectModalState));
              deleteProject();
            }}
          >
            <button>Delete project</button>
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default ControlProject;
