import CreateTaskBtn from "@/redux/features/handleTasks/createTaskBtn";
import GroupFilter from "@/redux/features/handleTasks/handleGroups/groupFilter";
import PriorityFilter from "@/redux/features/handleTasks/priorityFilter";
import { createClient } from "@/utils/supabase/server";
import React from "react";

type Props = {};

export const revalidate = 0;

async function Filters({}: Props) {
  // !! Write the getter function for groups here

  const supabase = createClient();
  let { data: Groups, error } = await supabase.from("Groups").select("*");

  return (
    <>
      <div className="z-40 flex w-full items-center justify-between pt-10">
        <div className="flex items-center gap-3">
          <PriorityFilter />
          <GroupFilter serverGroups={Groups} />
        </div>
        <CreateTaskBtn />
      </div>
    </>
  );
}

export default Filters;
