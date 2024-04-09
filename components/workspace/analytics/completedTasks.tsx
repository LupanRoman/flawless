import React from "react";

type Props = {
  completedTasks: any;
};

function CompletedTasks({ completedTasks }: Props) {
  return (
    <>
      <div className="flex items-center rounded-lg px-3 py-4 gap-5 w-full justify-center bg-2BG md:w-fit">
        <h1 className="text-xl font-medium">Completed tasks</h1>
        <p className="text-2xl font-bold">{completedTasks.length}</p>
      </div>
    </>
  );
}

export default CompletedTasks;
