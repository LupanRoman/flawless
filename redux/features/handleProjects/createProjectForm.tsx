"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { use, useEffect, useState } from "react";
import {
  createProjectModalState,
  handleCreateProjectModal,
} from "./handleProjectSlice";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { createClient } from "@/utils/supabase/client";
type Props = {};

function CreateProjectForm({}: Props) {
  const dispatch = useAppDispatch();
  const createProjectModalValue = useAppSelector(createProjectModalState);
  const [projectTitle, setProjectTitle] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [projectDeadline, setProjectDeadline] = useState("");
  const [userID, setUserID] = useState(String);

  useEffect(() => {
    const getUserID = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserID(user?.id || "");
    };
    getUserID();
  }, []);

  const createProject = async () => {
    const supabase = createClient();
    const { error } = await supabase.from("Projects").insert({
      title: projectTitle,
      favorite: isFavorite,
      deadline: projectDeadline,
      user_id: userID,
    });
  };

  return createProjectModalValue ? (
    <>
      <div className="absolute top-0 z-40 flex h-[100svh] w-full flex-col justify-between bg-2BG">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between px-5 pt-20">
            <h1 className="text-lg font-bold text-textColor">Create project</h1>
            <button
              onClick={() => {
                dispatch(handleCreateProjectModal(!createProjectModalValue));
              }}
            >
              <CloseRoundedIcon />
            </button>
          </div>
          <div className="flex flex-col gap-5 px-5 pt-20">
            <input
              type="text"
              placeholder="What is the project called"
              className="bg-transparent text-xl font-medium outline-none"
              onChange={(e) => {
                setProjectTitle(e.target.value);
              }}
            />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <p>Is favorite:</p>
                <button
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                  }}
                >
                  {isFavorite ? (
                    <BookmarkRoundedIcon />
                  ) : (
                    <BookmarkBorderRoundedIcon />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <p>Deadline:</p>
                <input
                  className="cursor-pointer bg-transparent text-textColor"
                  type="date"
                  onChange={(e) => {
                    setProjectDeadline(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end pb-24 pr-5">
          <button
            onClick={() => {
              createProject();
              dispatch(handleCreateProjectModal(!createProjectModalValue));
            }}
            className=" rounded-lg bg-brandColor px-3 py-2 font-bold"
          >
            Create
          </button>
        </div>
      </div>
    </>
  ) : null;
}

export default CreateProjectForm;
