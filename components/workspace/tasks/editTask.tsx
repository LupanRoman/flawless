"use client";
import React, { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
type Props = {
  slug: number;
};

function EditTask({ slug }: Props) {
  const router = useRouter();
  const [task, setTask] = useState<any[] | null>();

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
  return (
    <>
      {task?.map((element: any) => {
        return (
          <div className="absolute right-0 top-0 z-40 flex h-[100svh] w-full flex-col justify-between bg-2BG md:w-1/2">
            <div className="flex flex-col gap-10">
              <div className="flex items-center justify-between px-5 pt-10">
                <h1 className="text-lg font-normal text-textColor">
                  Create task
                </h1>
                <button
                  onClick={() => {
                    router.back();
                  }}
                >
                  <CloseRoundedIcon />
                </button>
              </div>
              <div className="flex flex-col gap-5 px-5 pt-20">
                <input
                  type="text"
                  placeholder="What do you want to do ?"
                  className="bg-transparent text-xl font-medium outline-none"
                  value={element.title}
                  onChange={(e) => {
                    // setTaskTitle(e.target.value);
                  }}
                />
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <p>Priority:</p>
                    <div
                      className="relative w-[150px] cursor-pointer rounded-lg bg-3BG px-3 py-1"
                      onClick={() => {
                        // dispatch(handleSetTaskPriorityState(!setTaskPriorityModal));
                      }}
                    >
                      {/* <p>{taskPriority == "" ? "None" : taskPriority}</p> */}
                      {/* <SetPriority /> */}
                      {element.priority}
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2">
                <p>Group:</p>
                <div
                  className="relative w-[150px] cursor-pointer rounded-lg bg-3BG px-3 py-1"
                  onClick={() => {
                    dispatch(handleTaskGroupState(!setTaskGroupModal));
                  }}
                >
                  <p>{taskGroup == "" ? "None" : taskGroup}</p>
                  <SetGroup />
                </div>
              </div> */}
                  <div className="flex items-center gap-2">
                    <p>Deadline:</p>
                    <input
                      className="cursor-pointer bg-transparent text-textColor"
                      type="date"
                      onChange={(e) => {
                        // setTaskDeadline(e.target.value);
                      }}
                      value={element.deadline}
                    />
                  </div>
                  <textarea
                    className="h-[200px] resize-none rounded-lg bg-3BG indent-2 outline-none"
                    placeholder="Task description"
                    name="taskDescription"
                    id="taskDescription"
                    onChange={(e) => {
                      //   setTaskDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end gap-4 pb-10 pr-5">
              <button
                onClick={() => {
                  //   createTask();
                  //   dispatch(handleCreateTaskModalState(!createTaskModal));
                }}
                className=" rounded-lg bg-brandColor px-3 py-2 font-medium"
              >
                Create
              </button>
              <button
                onClick={() => {
                  router.back();
                }}
                className="rounded-lg bg-3BG px-3 py-2 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default EditTask;