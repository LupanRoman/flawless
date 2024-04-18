import EditTask from "@/components/workspace/tasks/editTask";
import { createClient } from "@/utils/supabase/server";
import React from "react";

type Props = {};

async function page({ params: { slug } }: { params: { slug: number } }) {
  const supabase = createClient();
  const { data: TaskGroupID, error } = await supabase
    .from("Tasks")
    .select("group_id")
    .eq("id", slug);
  return (
    <>
      <div>
        <EditTask slug={slug} taskGroupID={TaskGroupID} />
      </div>
    </>
  );
}

export default page;
