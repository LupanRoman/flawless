"use client";
import { priorityFilterValue } from "@/redux/features/handleTasks/handleTasksSlice";
import { useAppSelector } from "@/redux/store";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

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
      <div className="flex flex-col gap-2">
        {tasksList.map((task: any) => {
          return (
            <>
              <div className="rounded-lg bg-2BG px-3 py-2">
                <h1>{task.title}</h1>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default TasksList;
