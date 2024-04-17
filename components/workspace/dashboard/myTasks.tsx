import React from "react";
import SingleTask from "../tasks/singleTask";
import Link from "next/link";

type Props = {
  serverTasks: any;
  projectID: number;
  groups: any;
};

function MyTasks({ serverTasks, projectID, groups }: Props) {
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
              groupID,
            }: {
              title: string;
              priority: string;
              id: number;
              project_id: number;
              status: string;
              groupID: number;
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
                          groupID={groupID}
                          groups={groups}
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
