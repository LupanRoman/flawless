import MyTasks from "@/components/workspace/dashboard/myTasks";
import ProjectState from "@/components/workspace/dashboard/projectState";
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

  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row">
        <MyTasks serverTasks={Tasks} projectID={id} />
        <ProjectState />
      </div>
    </>
  );
}

export default page;
