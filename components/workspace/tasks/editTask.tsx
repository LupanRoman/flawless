"use client";
import React, { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  TaskPriorityValue,
  handleSetTaskPriorityState,
  setTaskPriorityModalValue,
} from "@/redux/features/handleTasks/handleTasksSlice";
import SetPriority from "@/redux/features/handleTasks/setPriority";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
type Props = {
  slug: number;
};

function EditTask({ slug }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [task, setTask] = useState<any[] | null>();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const setTaskPriorityModal = useAppSelector(setTaskPriorityModalValue);
  const taskPriority = useAppSelector(TaskPriorityValue);
  const [showStatus, setShowStatus] = useState(false);
  const [taskStatus, setTaskStatus] = useState("To do");

  useEffect(() => {
    const getTask = async () => {
      const supabase = createClient();
      const { data: Task, error } = await supabase
        .from("Tasks")
        .select("*")
        .eq("id", slug);
      setTask(Task);
    };
    getTask();
  }, []);

  const updateTask = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Tasks")
      .update({
        title: taskTitle,
        priority: taskPriority,
        deadline: taskDeadline,
        description: taskDescription,
        status: taskStatus,
      })
      .eq("id", slug)
      .select();
  };

  // TODO Fast fix(make his function work with the main update function)
  const updateStatus = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Tasks")
      .update({
        status: taskStatus,
      })
      .eq("id", slug)
      .select();
  };

  const deleteTask = async () => {
    const supabase = createClient();
    const { error } = await supabase.from("Tasks").delete().eq("id", slug);
  };

  return (
    <>
      {task?.map((element: any) => {
        return (
          <>
            <div
              onClick={() => {
                router.back();
              }}
              className="absolute bottom-0 left-0 right-0 top-0 z-30 flex w-full
           justify-end bg-2BG/20"
            ></div>
            <div className="absolute right-0 top-0 z-50 flex h-[100svh] w-full flex-col justify-between bg-2BG md:w-1/2">
              <div className="flex flex-col gap-10">
                <div className="flex items-center justify-between px-5 pt-10">
                  <h1 className="text-lg font-normal text-textColor">
                    Edit task
                  </h1>
                  <button
                    onClick={() => {
                      deleteTask();
                      router.back();
                    }}
                  >
                    <DeleteOutlineRoundedIcon />
                  </button>
                </div>
                <div className="flex flex-col gap-5 px-5 pt-20">
                  {/* Make the status selector a single component */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowStatus(!showStatus);
                      }}
                      className="w-fit cursor-pointer rounded-lg bg-3BG px-2 py-1 text-sm"
                    >
                      {element.status}
                    </button>
                    {showStatus ? (
                      <div className="absolute top-10 z-20 flex flex-col items-start gap-2 rounded-lg bg-3BG px-2 py-1">
                        <button
                          onClick={() => {
                            setTaskStatus("To do");
                            updateStatus();
                            setShowStatus(!showStatus);
                          }}
                        >
                          To do
                        </button>
                        <button
                          onClick={() => {
                            setTaskStatus("In progress");
                            updateStatus();
                            setShowStatus(!showStatus);
                          }}
                        >
                          In progress
                        </button>
                        <button
                          onClick={() => {
                            setTaskStatus("Done");
                            updateStatus();
                            setShowStatus(!showStatus);
                          }}
                        >
                          Done
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    placeholder={element.title}
                    className="bg-transparent text-xl font-medium outline-none"
                    onChange={(e) => {
                      setTaskTitle(e.target.value);
                    }}
                  />
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <p>Priority:</p>
                      <div
                        className="relative w-[150px] cursor-pointer rounded-lg bg-3BG px-3 py-1"
                        onClick={() => {
                          dispatch(
                            handleSetTaskPriorityState(!setTaskPriorityModal),
                          );
                        }}
                      >
                        <p>
                          {element.priority ? element.priority : taskPriority}
                        </p>
                        <SetPriority />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p>Deadline:</p>
                      <input
                        className="cursor-pointer bg-transparent text-textColor"
                        type="date"
                        value={element.deadline}
                        onChange={(e) => {
                          setTaskDeadline(e.target.value);
                        }}
                      />
                    </div>
                    <textarea
                      className="h-[200px] resize-none rounded-lg bg-3BG indent-2 outline-none"
                      placeholder="Task description"
                      name="taskDescription"
                      id="taskDescription"
                      onChange={(e) => {
                        setTaskDescription(e.target.value);
                      }}
                    >
                      {element.description}
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-end gap-4 pb-10 pr-5">
                <button
                  onClick={() => {
                    updateTask();
                    router.back();
                  }}
                  className=" rounded-lg bg-brandColor px-3 py-2 font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    router.back();
                  }}
                  className="rounded-lg bg-3BG px-3 py-2 font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default EditTask;
