"use client";
import CreateTaskBtn from "@/redux/features/handleTasks/createTaskBtn";
import PriorityFilter from "@/redux/features/handleTasks/priorityFilter";
import React from "react";

type Props = {};

function Filters({}: Props) {
  return (
    <>
      <div className="z-40 flex w-full items-center justify-between pt-10">
        <div>
          <PriorityFilter />
        </div>
        <CreateTaskBtn />
      </div>
    </>
  );
}

export default Filters;
