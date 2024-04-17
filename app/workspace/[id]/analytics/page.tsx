import DaysLeft from "@/components/hub/daysLeft";
import CompletedTasks from "@/components/workspace/analytics/completedTasks";
import TotalTasks from "@/components/workspace/analytics/totalTasks";
import UncompletedTasks from "@/components/workspace/analytics/uncompletedTasks";
import CreateTaskForm from "@/redux/features/handleTasks/createTaskForm";
import { createClient } from "@/utils/supabase/server";
import React from "react";

type Props = {};

async function page({ params: { id } }: { params: { id: number } }) {
  const supabase = createClient();

  const { data: Tasks, error } = await supabase
    .from("Tasks")
    .select("*")
    .eq("project_id", id);

  const { data: CompletedTasksList } = await supabase
    .from("Tasks")
    .select("*")
    .eq("project_id", id)
    .eq("status", "Done");

  const { data: Project } = await supabase
    .from("Projects")
    .select("*")
    .eq("id", id);

  // const { data: Uncompleted } = await supabase
  //   .from("Tasks")
  //   .select("*")
  //   .eq("project_id", id)
  //   .eq("status", "To do" && "In progress");

  return (
    <>
      <div>
        <div className="flex w-full flex-col items-center gap-5 md:flex-row">
          <TotalTasks tasks={Tasks} />
          <CompletedTasks completedTasks={CompletedTasksList} />
          <DaysLeft deadline={Project![0].deadline} renderedIn="analytics" />
          <CreateTaskForm projectID={id} />
          {/* <UncompletedTasks uncompletedTasks={Uncompleted} /> */}
        </div>
      </div>
    </>
  );
}

export default page;
