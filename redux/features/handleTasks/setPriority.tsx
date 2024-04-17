"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import {
  handleSetTaskPriorityState,
  setTaskPriority,
  setTaskPriorityModalValue,
} from "./handleTasksSlice";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";

type Props = {};

function SetPriority({}: Props) {
  const dispatch = useAppDispatch();
  const setTaskPriorityModal = useAppSelector(setTaskPriorityModalValue);
  return (
    <>
      {/* <div className="relative w-fit"> */}
      {/* <div
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
        </div> */}
      {setTaskPriorityModal ? (
        <div className="absolute left-0 right-0 top-12 z-50 flex flex-col items-start gap-2 rounded-lg bg-4BG px-2 py-2">
          {/* <button
              className="w-full rounded-md px-2 py-1 text-start hover:bg-4BG"
              onClick={() => {
                // filterTasksByPriority("High");
                dispatch(setTaskPriority(""));
                dispatch(handleSetTaskPriorityState(!setTaskPriorityModal));
              }}
            >
              All
            </button> */}
          <div
            className="flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-1 text-start hover:bg-highPriority/20"
            onClick={() => {
              // filterTasksByPriority("High");
              dispatch(setTaskPriority("High"));
              dispatch(handleSetTaskPriorityState(!setTaskPriorityModal));
            }}
          >
            <p className="rotate-90 text-highPriority">
              <LabelRoundedIcon />
            </p>
            <p>High</p>
          </div>
          <div
            className="flex w-full items-center gap-3 rounded-md px-2 py-1 text-start hover:bg-mediumPriority/20"
            onClick={() => {
              // filterTasksByPriority("High");
              dispatch(setTaskPriority("Medium"));
              dispatch(handleSetTaskPriorityState(!setTaskPriorityModal));
            }}
          >
            <p className="rotate-90 text-mediumPriority">
              <LabelRoundedIcon />
            </p>
            <p>Medium</p>
          </div>
          <div
            className="flex w-full items-center gap-3 rounded-md px-2 py-1 text-start hover:bg-lowPriority/20"
            onClick={() => {
              // filterTasksByPriority("High");
              dispatch(setTaskPriority("Low"));
              dispatch(handleSetTaskPriorityState(!setTaskPriorityModal));
            }}
          >
            <p className="rotate-90 text-lowPriority">
              <LabelRoundedIcon />
            </p>
            <p>Low</p>
          </div>
        </div>
      ) : null}
      {/* </div> */}
    </>
  );
}

export default SetPriority;
