import CreateTaskBtn from "@/redux/features/handleTasks/createTaskBtn";
import PriorityFilter from "@/redux/features/handleTasks/priorityFilter";
import React from "react";

type Props = {};

export const revalidate = 0;

async function Filters({}: Props) {
  // !! Write the getter function for groups here

  return (
    <>
      <div className="z-10 flex w-full items-center justify-between pt-10">
        <div className="flex items-center gap-3">
          <PriorityFilter />
        </div>
        <CreateTaskBtn renderedIn="tasksPage" />
      </div>
    </>
  );
}

export default Filters;
