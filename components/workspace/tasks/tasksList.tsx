"use client";
import Boards from "@/data/boards";
import { priorityFilterValue } from "@/redux/features/handleTasks/handleTasksSlice";
import { useAppSelector } from "@/redux/store";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import SingleTask from "./singleTask";

type Props = { serverTasks: any; projectID: number };

function TasksList({ serverTasks, projectID }: Props) {
  const [tasksList, setTasksList] = useState(serverTasks);
  const priorityFilter = useAppSelector(priorityFilterValue);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Tasks" },
        async () => {
          const { data: Tasks } = await supabase.from("Tasks").select("*");
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
      setTasksList(Tasks);
      console.log(Tasks);
    };
    filterTasks();
  }, [priorityFilter]);

  return (
    <>
      <div className="horizontal flex snap-x gap-8 overflow-x-auto md:h-full md:overflow-x-hidden">
        {Boards.map((board) => {
          return (
            <>
              <div
                key={board.id}
                className="boardComponent flex h-[550px] w-full flex-none snap-center flex-col gap-5 rounded-lg md:h-full md:flex-auto"
              >
                <h1 className="text-lg font-bold">{board.title}</h1>
                <div className="flex h-[550px] flex-col gap-5 overflow-y-auto pr-2 md:h-[450px]">
                  {tasksList.map((task: any) => {
                    return (
                      <>
                        {task.status == board.title ? (
                          // <div className="rounded-lg bg-2BG px-3 py-2">
                          //   <h1>{task.title}</h1>
                          // </div>
                          <SingleTask
                            title={task.title}
                            priority={task.priority}
                            key={task.id}
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
    </>
  );
}

export default TasksList;
