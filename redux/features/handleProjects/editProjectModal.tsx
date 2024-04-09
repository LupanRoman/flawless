"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { editProjectModalValue } from "./handleProjectSlice";
import { createClient } from "@/utils/supabase/client";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

type Props = {};

function EditProjectModal({}: Props) {
  const [currentProjectID, setCurrentProjectID] = useState(Number);
  const [project, setProject] = useState<any[] | null>();
  const [projectTitle, setProjectTitle] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [projectDeadline, setProjectDeadline] = useState("");

  useEffect(() => {
    const projectID = JSON.parse(localStorage.getItem("projectID") || "");
    setCurrentProjectID(projectID);
  }, []);

  setTimeout(() => {
    const getProject = async () => {
      const supabase = createClient();
      const { data: Project, error } = await supabase
        .from("Projects")
        .select("*")
        .eq("id", currentProjectID);
      setProject(Project);
    };
    getProject();
  }, 200);

  //   useEffect(() => {
  //     const getProject = async () => {
  //       const supabase = createClient();
  //       const { data: Project, error } = await supabase
  //         .from("Projects")
  //         .select("*")
  //         .eq("id", currentProjectID);
  //       setProject(Project);
  //     };
  //     getProject();
  //   }, []);

  const dispatch = useAppDispatch();
  const editProjectModal = useAppSelector(editProjectModalValue);

  const updateProject = async (
    title: string,
    favorite: boolean,
    deadline: string,
  ) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Projects")
      .update({
        title: projectTitle == "" ? title : projectTitle,
        favorite: isFavorite,
        deadline: projectDeadline == "" ? deadline : projectDeadline,
      })
      .eq("id", currentProjectID)
      .select();
  };

  return (
    <>
      {editProjectModal ? (
        <div className="absolute right-8 top-10 flex w-[200px] flex-col items-start gap-3 rounded-lg bg-2BG px-2 py-2 text-sm font-medium">
          {project?.map(({ title, favorite, deadline }) => {
            return (
              <>
                <div>
                  <input
                    type="text"
                    placeholder={title}
                    className="bg-transparent text-xl font-medium outline-none"
                  />
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
                  <input type="date" placeholder={deadline} />
                  <button
                    onClick={() => {
                      updateProject(title, favorite, deadline);
                    }}
                  >
                    Save
                  </button>
                </div>
              </>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default EditProjectModal;
