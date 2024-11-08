"use client";
import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { priorityFilterValue, setPriorityFilter } from "./handleTasksSlice";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";
type Props = {};

function PriorityFilter({}: Props) {
  const dispatch = useAppDispatch();
  const priorityValue = useAppSelector(priorityFilterValue);
  const [openPriorityLabels, setOpenPriorityLabels] = useState(false);
  return (
    <>
      <div className="relative w-fit">
        <div
          onClick={() => {
            setOpenPriorityLabels(!openPriorityLabels);
          }}
          className="flex w-[150px] cursor-pointer items-center justify-between rounded-lg bg-2BG px-2 py-1"
        >
          <p className="text-sm">
            {priorityValue == "" ? "Priority" : priorityValue}
          </p>
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
          <div className="absolute left-0 right-0 top-12 flex flex-col items-start gap-2 rounded-lg bg-3BG px-2 py-2 text-sm">
            <button
              className="w-full rounded-md px-2 py-1 text-start hover:bg-4BG"
              onClick={() => {
                dispatch(setPriorityFilter(""));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              All
            </button>
            <div
              className="flex w-full cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-start hover:bg-highPriority/20"
              onClick={() => {
                dispatch(setPriorityFilter("High"));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              <p className="rotate-90 text-highPriority">
                <LabelRoundedIcon />
              </p>
              <p>High</p>
            </div>
            <div
              className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-start hover:bg-mediumPriority/20"
              onClick={() => {
                dispatch(setPriorityFilter("Medium"));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              <p className="rotate-90 text-mediumPriority">
                <LabelRoundedIcon />
              </p>
              <p>Medium</p>
            </div>
            <div
              className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-start hover:bg-lowPriority/20"
              onClick={() => {
                dispatch(setPriorityFilter("Low"));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              <p className="rotate-90 text-lowPriority">
                <LabelRoundedIcon />
              </p>
              <p>Low</p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default PriorityFilter;
