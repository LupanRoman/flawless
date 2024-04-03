import EditTask from "@/components/workspace/tasks/editTask";
import React from "react";

type Props = {};

function page({ params: { slug } }: { params: { slug: number } }) {
  return (
    <>
      <div>
        <EditTask slug={slug} />
      </div>
    </>
  );
}

export default page;
