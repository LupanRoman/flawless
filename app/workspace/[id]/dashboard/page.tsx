import MyTasks from "@/components/workspace/dashboard/myTasks";
import ProjectState from "@/components/workspace/dashboard/projectState";
import CreateTaskForm from "@/redux/features/handleTasks/createTaskForm";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";

async function page({ params: { id } }: { params: { id: number } }) {
  const supabase = createClient();
  const { data: Project, error } = await supabase
    .from("Projects")
    .select("*")
    .eq("id", id);

  const { data: Tasks, error: e } = await supabase
    .from("Tasks")
    .select("*")
    .eq("project_id", id);

  const { data: Groups, error: groupError } = await supabase
    .from("Groups")
    .select("*")
    .eq("project_id", id);

  return (
    <>
      <div>
        <div className="flex flex-col gap-5 md:flex-row">
          <MyTasks serverTasks={Tasks} projectID={id} groups={Groups} />
          <ProjectState />
          <CreateTaskForm projectID={id} />
        </div>
      </div>
    </>
  );
}

export default page;
