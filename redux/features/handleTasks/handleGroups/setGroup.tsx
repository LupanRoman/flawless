"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import {
  handleTaskGroupState,
  setTaskGroup,
  setTaskGroupID,
  setTaskGroupModalValue,
} from "../handleTasksSlice";

type Props = {
  projectID: number;
  groups: any;
};

function SetGroup({ projectID, groups }: Props) {
  const dispatch = useAppDispatch();
  const setGroupModal = useAppSelector(setTaskGroupModalValue);

  return (
    <>
      <div>
        {setGroupModal ? (
          <div className="absolute left-0 right-0 top-12 flex flex-col items-start gap-2 rounded-lg bg-4BG px-2 py-2">
            {groups?.map((group: any) => {
              return (
                <>
                  <button
                    onClick={() => {
                      dispatch(setTaskGroup(group.title));
                      dispatch(setTaskGroupID(group.id));
                      dispatch(handleTaskGroupState(false));
                      // !! write the function to set the group
                    }}
                    className="text-sm"
                  >
                    {group.title.toLowerCase()}
                  </button>
                </>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default SetGroup;
