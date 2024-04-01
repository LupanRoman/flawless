"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import {
  handleTaskGroupState,
  setTaskGroup,
  setTaskGroupModalValue,
} from "../handleTasksSlice";

type Props = {};

function SetGroup({}: Props) {
  const dispatch = useAppDispatch();
  const setGroupModal = useAppSelector(setTaskGroupModalValue);
  const [groupList, setGroupList] = useState<any[] | null>();
  useEffect(() => {
    const getGroups = async () => {
      const supabase = createClient();
      const { data: Goals, error } = await supabase.from("Groups").select("*");
      setGroupList(Goals);
    };
    console.log(groupList);

    getGroups();
  }, []);

  return (
    <>
      <div>
        {setGroupModal ? (
          <div className="flex flex-col">
            {groupList?.map((group) => {
              return (
                <>
                  <div className="absolute left-0 right-0 top-12 flex flex-col items-start gap-2 rounded-lg bg-4BG px-2 py-2">
                    <button
                      onClick={() => {
                        dispatch(setTaskGroup(group.group_title));
                        dispatch(handleTaskGroupState(false));
                      }}
                      className="text-sm"
                    >
                      {group.group_title.toLowerCase()}
                    </button>
                  </div>
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
