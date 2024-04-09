import React from "react";

type Props = {};

function ProjectState({}: Props) {
  return (
    <>
      <div className="flex h-full md:w-1/2 flex-col justify-between opacity-25 gap-56">
        <h1 className="text-lg font-medium">Project state</h1>
        <div className="flex w-full justify-center">
          <p className="text-sm font-medium -rotate-45">Coming soon...</p>
        </div>
      </div>
    </>
  );
}

export default ProjectState;
