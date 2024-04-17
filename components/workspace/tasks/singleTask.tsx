"use client";
import React, { useEffect, useState } from "react";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type Props = {
  title: string;
  priority: string;
  taskID: number;
  projectID: number;
  status: string;
  groupID: number;
  groups: any;
};

function SingleTask({
  title,
  priority,
  projectID,
  taskID,
  status,
  groupID,
  groups,
}: Props) {
  // const [taskGroup, setTaskGroup] = useState<any[] | null>();
  // useEffect(() => {
  //   if (groupID != null) {
  //     const getGroup = async () => {
  //       const supabase = createClient();
  //       let { data: Group } = await supabase
  //         .from("Groups")
  //         .select("*")
  //         .eq("id", groupID);
  //       setTaskGroup(Group);
  //       console.log(Group);
  //     };
  //     getGroup();
  //   } else if (groupID == null) {
  //     return;
  //   }
  // }, []);

  return (
    <>
      <Link href={`/workspace/${projectID}/tasks/${taskID}`}>
        <div
          className={`relative flex cursor-pointer flex-col gap-5 rounded-lg ${status == "To do" ? "bg-2BG" : status == "In progress" ? "bg-[#66A3FF1A]" : status == "Done" ? "bg-[#8AFF951A]" : "bg-2BG"} px-3 py-2`}
        >
          <div className="flex">
            <p
              className={`${priority == "High" ? "text-highPriority" : priority == "Medium" ? "text-mediumPriority" : priority == "Low" ? "text-lowPriority" : "hidden"} absolute -top-1 right-4 rotate-90`}
            >
              <LabelRoundedIcon />
            </p>
            {/* Implement group creation and filtering */}
            {groups.map((group: any) => {
              return group.id == groupID ? (
                <p className="w-fit rounded-full bg-3BG px-2 py-1 text-xs font-medium">
                  {group.title}
                </p>
              ) : null;
            })}
          </div>
          <h2 className="text-sm font-normal">{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default SingleTask;
