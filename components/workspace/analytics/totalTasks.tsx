import React from "react";

type Props = {
  tasks: any;
};

function TotalTasks({ tasks }: Props) {
  return (
    <>
      <div className="flex w-full items-center gap-5 rounded-lg bg-2BG px-3 py-4 md:w-fit justify-center">
        <h1 className="text-xl font-medium">All tasks</h1>
        <p className="text-2xl font-bold">{tasks.length}</p>
      </div>
    </>
  );
}

export default TotalTasks;
