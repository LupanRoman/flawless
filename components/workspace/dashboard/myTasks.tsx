import React from "react";
import SingleTask from "../tasks/singleTask";
import Link from "next/link";

type Props = {
  serverTasks: any;
  projectID: number;
};

function MyTasks({ serverTasks, projectID }: Props) {
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
              status,
            }: {
              title: string;
              priority: string;
              id: number;
              project_id: number;
              status: string;
            }) => {
              return (
                <>
                  {serverTasks.length <= 0 ? (
                    <>
                      <Link href={`/workspace/${projectID}/tasks`}>
                        <button className="rounded-lg bg-brandColor px-3 py-1 text-lg font-medium">
                          Add some tasks
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      {status == "Done" ? null : (
                        <SingleTask
                          title={title}
                          priority={priority}
                          taskID={id}
                          projectID={project_id}
                          status={"to do"}
                        />
                      )}
                    </>
                  )}
                </>
              );
            },
          )}
        </div>
      </div>
    </>
  );
}

export default MyTasks;
