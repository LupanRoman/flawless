"use client";
import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { createClient } from "@/utils/supabase/client";
import { useAppDispatch } from "@/redux/store";
import { setPriorityFilter } from "./handleTasksSlice";
type Props = {
  filterTasksByPriority: (taskPriority: string) => void;
};

function PriorityFilter({ filterTasksByPriority }: Props) {
  //   const filterHighTasks = async () => {
  //     const supabase = createClient();
  //     const { data: FilteredTasks, error } = await supabase
  //       .from("Tasks")
  //       .select("*")
  //       .eq("priority", "Low");
  //     console.log(FilteredTasks);
  //   };
  const dispatch = useAppDispatch();
  const [openPriorityLabels, setOpenPriorityLabels] = useState(false);
  return (
    <>
      <div className="relative w-fit">
        <div
          onClick={() => {
            setOpenPriorityLabels(!openPriorityLabels);
          }}
          className="flex w-fit items-center gap-8 rounded-lg bg-2BG px-4 py-2"
        >
          <p>Priority</p>
          {openPriorityLabels ? (
            <p className="rotate-180 duration-700">
              <ExpandMoreRoundedIcon />
            </p>
          ) : (
            <p className="rotate-0 duration-700">
              <ExpandMoreRoundedIcon />
            </p>
          )}
        </div>
        {openPriorityLabels ? (
          <div className="absolute left-0 right-0 top-12 flex flex-col items-start gap-2 rounded-lg bg-3BG px-2 py-2">
            <button
              className="w-full rounded-md px-2 py-1 text-start hover:bg-4BG"
              onClick={() => {
                // filterTasksByPriority("High");
                dispatch(setPriorityFilter(""));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              All
            </button>
            <button
              className="w-full rounded-md px-2 py-1 text-start hover:bg-red-700/50"
              onClick={() => {
                // filterTasksByPriority("High");
                dispatch(setPriorityFilter("High"));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              High
            </button>
            <button
              className="w-full rounded-md px-2 py-1 text-start hover:bg-orange-600/50"
              onClick={() => {
                // filterTasksByPriority("High");
                dispatch(setPriorityFilter("Medium"));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              Medium
            </button>
            <button
              className="w-full rounded-md px-2 py-1 text-start hover:bg-blue-500/50"
              onClick={() => {
                // filterTasksByPriority("High");
                dispatch(setPriorityFilter("Low"));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              Low
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default PriorityFilter;
