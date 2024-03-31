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
          className="flex w-[150px] items-center justify-between rounded-lg bg-2BG px-4 py-2"
        >
          <p> {priorityValue == "" ? "Priority" : priorityValue}</p>
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
                dispatch(setPriorityFilter(""));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              All
            </button>
            <div
              className="hover:bg-highPriority/20 flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-1 text-start"
              onClick={() => {
                dispatch(setPriorityFilter("High"));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              <p className="text-highPriority rotate-90">
                <LabelRoundedIcon />
              </p>
              <p>High</p>
            </div>
            <div
              className="hover:bg-mediumPriority/20 flex w-full items-center gap-3 rounded-md px-2 py-1 text-start"
              onClick={() => {
                dispatch(setPriorityFilter("Medium"));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              <p className="text-mediumPriority rotate-90">
                <LabelRoundedIcon />
              </p>
              <p>Medium</p>
            </div>
            <div
              className="hover:bg-lowPriority/20 flex w-full items-center gap-3 rounded-md px-2 py-1 text-start"
              onClick={() => {
                dispatch(setPriorityFilter("Low"));
                setOpenPriorityLabels(!openPriorityLabels);
              }}
            >
              <p className="text-lowPriority rotate-90">
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
