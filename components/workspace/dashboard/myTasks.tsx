import React from "react";
import SingleTask from "../tasks/singleTask";

type Props = {
  serverTasks: any;
};

function MyTasks({ serverTasks }: Props) {
  console.log(serverTasks);

  return (
    <>
      <div
        className="flex flex-col gap-3 md:w-1/2
      "
      >
        <h1 className="text-lg font-medium">My tasks</h1>
        <div className="tasks-scroll flex h-[580px] flex-col gap-3 overflow-y-auto pr-2 md:h-[600px]">
          {serverTasks.map(
            ({
              title,
              priority,
              id,
              project_id,
            }: {
              title: string;
              priority: string;
              id: number;
              project_id: number;
            }) => {
              return (
                <SingleTask
                  title={title}
                  priority={priority}
                  taskID={id}
                  projectID={project_id}
                />
              );
            },
          )}
        </div>
      </div>
    </>
  );
}

export default MyTasks;
