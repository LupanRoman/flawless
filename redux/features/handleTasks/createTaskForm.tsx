"use client";
import React, { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  TaskPriorityValue,
  createTaskModalValue,
  handleCreateTaskModalState,
  handleSetTaskPriorityState,
  handleTaskGroupState,
  setTaskGroup,
  setTaskGroupID,
  setTaskGroupIDValue,
  setTaskGroupModalValue,
  setTaskPriority,
  setTaskPriorityModalValue,
  setTaskStatus,
  taskGroupValue,
} from "./handleTasksSlice";
import SetPriority from "./setPriority";
import { createClient } from "@/utils/supabase/client";
import SetGroup from "./handleGroups/setGroup";
type Props = {
  projectID: number;
};

function CreateTaskForm({ projectID }: Props) {
  const dispatch = useAppDispatch();
  const createTaskModal = useAppSelector(createTaskModalValue);
  const setTaskPriorityModal = useAppSelector(setTaskPriorityModalValue);
  const taskPriority = useAppSelector(TaskPriorityValue);
  const setTaskGroupModal = useAppSelector(setTaskGroupModalValue);
  const taskGroup = useAppSelector(taskGroupValue);
  const taskGroupID = useAppSelector(setTaskGroupIDValue);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [groupList, setGroupList] = useState<any[] | null>();

  const createTask = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Tasks")
      .insert([
        {
          title: taskTitle,
          priority: taskPriority,
          deadline: taskDeadline,
          description: taskDescription,
          project_id: projectID,
          status: "To do",
          group_id: taskGroupID == 0 ? null : taskGroupID,
        },
      ])
      .select();
    console.log(error);
  };

  const getGroups = async () => {
    const supabase = createClient();
    const { data: Groups, error } = await supabase
      .from("Groups")
      .select("*")
      .eq("project_id", projectID);
    setGroupList(Groups);
  };

  return createTaskModal ? (
    <>
      <div className="absolute right-0 top-0 z-40 flex h-[100svh] w-full flex-col justify-between bg-2BG md:w-1/2">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between px-5 pt-10">
            <h1 className="text-lg font-medium text-textColor">Create task</h1>
            <button
              onClick={() => {
                dispatch(handleCreateTaskModalState(!createTaskModal));
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
                    dispatch(handleSetTaskPriorityState(!setTaskPriorityModal));
                  }}
                >
                  <p>{taskPriority == "" ? "None" : taskPriority}</p>
                  <SetPriority />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <p
                  onClick={() => {
                    console.log(groupList);
                  }}
                >
                  Group:
                </p>
                <div
                  className="relative w-[150px] cursor-pointer rounded-lg bg-3BG px-3 py-1"
                  onClick={() => {
                    dispatch(handleTaskGroupState(!setTaskGroupModal));
                  }}
                >
                  <p
                    onClick={() => {
                      getGroups();
                    }}
                  >
                    {taskGroup == "" ? "None" : taskGroup}
                  </p>
                  <SetGroup groups={groupList} projectID={projectID} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <p>Deadline:</p>
                <input
                  className="cursor-pointer bg-transparent text-textColor"
                  type="date"
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
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end pb-10 pr-5">
          <button
            onClick={() => {
              createTask();
              dispatch(handleCreateTaskModalState(!createTaskModal));
              dispatch(setTaskStatus(""));
              setTaskTitle("");
              dispatch(setTaskPriority(""));
              setTaskDeadline("");
              setTaskDescription("");
              dispatch(setTaskGroup(""));
              dispatch(setTaskGroupID(0));
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

export default CreateTaskForm;
