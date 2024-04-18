"use client";
import React, { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  TaskPriorityValue,
  handleSetTaskPriorityState,
  handleTaskGroupState,
  handleTaskStatusModal,
  setTaskGroup,
  setTaskGroupIDValue,
  setTaskGroupModalValue,
  setTaskPriority,
  setTaskPriorityModalValue,
  setTaskStatus,
  taskGroupValue,
  taskStatusModalValue,
  taskStatusValue,
} from "@/redux/features/handleTasks/handleTasksSlice";
import SetPriority from "@/redux/features/handleTasks/setPriority";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditTaskStatus from "./editTaskStatus";
import SetGroup from "@/redux/features/handleTasks/handleGroups/setGroup";
type Props = {
  slug: number;
  taskGroupID: any;
};

function EditTask({ slug, taskGroupID }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [task, setTask] = useState<any[] | null>();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const setTaskPriorityModal = useAppSelector(setTaskPriorityModalValue);
  const taskStatus = useAppSelector(taskStatusValue);
  const taskPriority = useAppSelector(TaskPriorityValue);
  // const [showStatus, setShowStatus] = useState(false);
  const taskStatusModal = useAppSelector(taskStatusModalValue);
  // const [taskStatus, setTaskStatus] = useState("To do");
  const [taskGroupTitle, setTaskGroupTitle] = useState<any[] | null | string>();
  const setTaskGroupModal = useAppSelector(setTaskGroupModalValue);
  const [groupsList, setGroupsList] = useState<any[] | null>();
  const taskGroupCurrentTitle = useAppSelector(taskGroupValue);
  const updatedTaskGroupID = useAppSelector(setTaskGroupIDValue);

  useEffect(() => {
    const getTask = async () => {
      const supabase = createClient();
      const { data: Task, error } = await supabase
        .from("Tasks")
        .select("*")
        .eq("id", slug);
      setTask(Task);
      // console.log(Task);
    };
    getTask();
    console.log(taskGroupID);
  }, []);

  useEffect(() => {
    if (taskGroupID[0].group_id == null) {
      setTaskGroupTitle("None");
    } else {
      const getGroup = async () => {
        const supabase = createClient();

        const { data: Group, error } = await supabase
          .from("Groups")
          .select("*")
          .eq("id", taskGroupID[0].group_id);
        console.log(Group);
        setTaskGroupTitle(Group![0].title);
      };
      getGroup();
    }
  }, []);

  const updateTask = async (
    title: string,
    priority: string,
    deadline: string,
    description: string,
    status: string,
    group_id: number,
  ) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Tasks")
      .update({
        title: taskTitle == "" ? title : taskTitle,
        priority: taskPriority == "" ? priority : taskPriority,
        deadline: taskDeadline == "" ? deadline : taskDeadline,
        description: taskDescription == "" ? description : taskDescription,
        status: taskStatus == "" ? status : taskStatus,
        group_id: taskGroupID == group_id ? group_id : updatedTaskGroupID,
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
      {task?.map(
        ({
          title,
          status,
          priority,
          deadline,
          description,
          group_id,
          project_id,
        }) => {
          return (
            <>
              <div
                onClick={() => {
                  router.back();
                  dispatch(setTaskStatus(""));
                  setTaskTitle("");
                  dispatch(setTaskPriority(""));
                  setTaskDeadline("");
                  setTaskDescription("");
                  dispatch(setTaskGroup(""));
                  dispatch(handleTaskGroupState(false));
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
                          dispatch(handleTaskStatusModal(!taskStatusModal));
                        }}
                        className="w-fit cursor-pointer rounded-lg bg-3BG px-2 py-1 text-sm"
                      >
                        {taskStatus == "" ? status : taskStatus}
                      </button>
                      {taskStatusModal ? <EditTaskStatus /> : null}
                    </div>
                    <input
                      type="text"
                      // placeholder={title}
                      value={taskTitle == "" ? title : taskTitle}
                      className="bg-transparent text-xl font-medium outline-none"
                      onChange={(e) => {
                        setTaskTitle(e.target.value);
                      }}
                    />
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <p
                          onClick={() => {
                            console.log(priority);
                            console.log(taskPriority);
                          }}
                        >
                          Priority:
                        </p>
                        <div
                          className="relative w-[150px] cursor-pointer rounded-lg bg-3BG px-3 py-1"
                          onClick={() => {
                            dispatch(
                              handleSetTaskPriorityState(!setTaskPriorityModal),
                            );
                          }}
                        >
                          <p>{taskPriority == "" ? priority : taskPriority}</p>
                          <SetPriority />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <p>Group:</p>
                        <div
                          onClick={() => {
                            dispatch(handleTaskGroupState(!setTaskGroupModal));
                          }}
                          className="relative w-[150px] cursor-pointer rounded-lg bg-3BG px-3 py-1"
                        >
                          <p
                            onClick={async () => {
                              const supabase = createClient();
                              const { data: Groups, error } = await supabase
                                .from("Groups")
                                .select("*")
                                .eq("project_id", project_id);
                              setGroupsList(Groups);
                              console.log(Groups);
                            }}
                          >
                            {taskGroupCurrentTitle == ""
                              ? taskGroupTitle
                              : taskGroupCurrentTitle}
                          </p>
                          <SetGroup groups={groupsList} renderedIn="editTask" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <p>Deadline:</p>
                        <input
                          className="cursor-pointer bg-transparent text-textColor"
                          type="date"
                          value={taskDeadline == "" ? deadline : taskDeadline}
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
                        value={
                          taskDescription == "" ? description : taskDescription
                        }
                        onChange={(e) => {
                          setTaskDescription(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-end gap-4 pb-10 pr-5">
                  <button
                    onClick={() => {
                      updateTask(
                        title,
                        priority,
                        deadline,
                        description,
                        status,
                        group_id,
                      );
                      dispatch(setTaskStatus(""));
                      setTaskTitle("");
                      dispatch(setTaskPriority(""));
                      setTaskDeadline("");
                      setTaskDescription("");
                      dispatch(setTaskGroup(""));
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
        },
      )}
    </>
  );
}

export default EditTask;
