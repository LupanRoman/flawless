"use client";
import Boards from "@/data/boards";
import {
  groupIDFilterValue,
  priorityFilterValue,
  setTaskGroupIDValue,
} from "@/redux/features/handleTasks/handleTasksSlice";
import { useAppSelector } from "@/redux/store";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import SingleTask from "./singleTask";
import Filters from "./filters";

type Props = { serverTasks: any; projectID: number; groups: any };

function TasksList({ serverTasks, projectID, groups }: Props) {
  const [tasksList, setTasksList] = useState(serverTasks);
  const priorityFilter = useAppSelector(priorityFilterValue);
  const groupIDFilter = useAppSelector(groupIDFilterValue);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Tasks" },
        async () => {
          const { data: Tasks } = await supabase
            .from("Tasks")
            .select("*")
            .eq("project_id", projectID);
          setTasksList(Tasks);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverTasks]);

  useEffect(() => {
    const filterTasks = async () => {
      const supabase = createClient();

      // !! These values need to be controlled by the user
      const filtersApplied = true;
      const filterByPriority: string = priorityFilter;

      let query = supabase
        .from("Tasks")
        .select("*")
        .eq("project_id", projectID);

      if (filtersApplied) {
        switch (filterByPriority) {
          case "High":
            query = query
              .eq("project_id", projectID)
              .eq("priority", filterByPriority);
            break;
          case "Medium":
            query = query
              .eq("project_id", projectID)
              .eq("priority", filterByPriority);
            break;
          case "Low":
            query = query
              .eq("project_id", projectID)
              .eq("priority", filterByPriority);
            break;
        }
      }

      const { data: Tasks, error } = await query;
      if (priorityFilter != "All") {
        setTasksList(Tasks);
      }
    };
    filterTasks();
  }, [priorityFilter]);

  useEffect(() => {
    const filterTasksByGroup = async () => {
      const supabase = createClient();

      let query = supabase
        .from("Tasks")
        .select("*")
        .eq("group_id", groupIDFilter);

      if (groupIDFilter == 0) {
        const { data: Tasks } = await supabase
          .from("Tasks")
          .select("*")
          .eq("project_id", projectID);
        setTasksList(Tasks);
      } else {
        const { data: Tasks, error } = await query;
        setTasksList(Tasks);
      }
    };
    filterTasksByGroup();
  }, [groupIDFilter]);

  return (
    <>
      <div className="flex w-full flex-col gap-10">
        <div className="horizontal flex snap-x gap-3 overflow-x-auto md:h-full md:overflow-x-hidden md:pr-10">
          {Boards.map((board) => {
            return (
              <>
                <div
                  key={board.id}
                  className="boardComponent flex h-[580px] w-full flex-none snap-center flex-col gap-3 rounded-lg md:h-full md:flex-auto"
                >
                  <h1 className="text-lg font-semibold">{board.title}</h1>
                  <div className="tasks-scroll flex h-[580px] w-full flex-col gap-3 overflow-y-auto pr-2 md:h-[500px]">
                    {tasksList.map((task: any) => {
                      return (
                        <>
                          {task.status == board.title ? (
                            <SingleTask
                              title={task.title}
                              priority={task.priority}
                              key={task.id}
                              projectID={projectID}
                              taskID={task.id}
                              status={task.status}
                              groupID={task.group_id}
                              groups={groups}
                            />
                          ) : null}
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TasksList;
