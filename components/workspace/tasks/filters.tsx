"use client";
import PriorityFilter from "@/redux/features/handleTasks/priorityFilter";
import React from "react";

type Props = {
  filterTasksByPriority: (taskPriority: string) => void;
};

function Filters({ filterTasksByPriority }: Props) {
  return (
    <>
      <div className="z-40 pt-10">
        <PriorityFilter filterTasksByPriority={filterTasksByPriority} />
      </div>
    </>
  );
}

export default Filters;
