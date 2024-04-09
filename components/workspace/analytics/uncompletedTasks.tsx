import React from "react";

type Props = {
  uncompletedTasks: any;
};

function UncompletedTasks({ uncompletedTasks }: Props) {
  return (
    <>
      <div>
        <h1>Uncompleted tasks</h1>
        <p>{uncompletedTasks.length}</p>
      </div>
    </>
  );
}

export default UncompletedTasks;
