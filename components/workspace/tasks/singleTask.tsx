import React from "react";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";
import Link from "next/link";

type Props = {
  title: string;
  priority: string;
  taskID: number;
  projectID: number;
};

function SingleTask({ title, priority, projectID, taskID }: Props) {
  return (
    <>
      <Link href={`/workspace/${projectID}/tasks/${taskID}`}>
        <div className="relative flex cursor-pointer flex-col gap-5 rounded-lg bg-2BG px-3 py-2">
          <div className="flex">
            <p
              className={`${priority == "High" ? "text-highPriority" : priority == "Medium" ? "text-mediumPriority" : priority == "Low" ? "text-lowPriority" : "hidden"} absolute -top-1 right-4 rotate-90`}
            >
              <LabelRoundedIcon />
            </p>
            <p className="w-fit rounded-full bg-3BG px-2 py-1 text-xs font-medium">
              MVP
            </p>
          </div>
          <h2 className="text-sm font-normal">{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default SingleTask;
