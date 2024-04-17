"use client";
import React, { useEffect, useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CreateGroupForm from "./createGroupForm";
import { createClient } from "@/utils/supabase/client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  createGroupModalValue,
  handleCreateTaskGroupModal,
} from "../handleTasksSlice";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

type Props = {
  serverGroups: any;
};

function GroupFilter({ serverGroups }: Props) {
  const [groupList, setGroupList] = useState(serverGroups);
  const dispatch = useAppDispatch();
  const createGroupModal = useAppSelector(createGroupModalValue);
  const [openGroupLabels, setOpenGroupLabels] = useState(false);
  // const [createGroupForm, setCreateGroupForm] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Groups" },
        async () => {
          const { data: Groups } = await supabase.from("Groups").select("*");
          setGroupList(Groups);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverGroups]);

  const deleteGroup = async (groupID: number) => {
    const supabase = createClient();
    const { error } = await supabase.from("Groups").delete().eq("id", groupID);
  };

  return (
    <>
      <div className="relative w-fit">
        <div
          onClick={() => {
            setOpenGroupLabels(!openGroupLabels);
          }}
          className="flex w-[150px] cursor-pointer items-center justify-between rounded-lg bg-2BG px-2 py-1"
        >
          <p className="text-sm">Group</p>
          {openGroupLabels ? (
            <p className="rotate-180 duration-700">
              <ExpandMoreRoundedIcon />
            </p>
          ) : (
            <p className="rotate-0 duration-700">
              <ExpandMoreRoundedIcon />
            </p>
          )}
        </div>

        {openGroupLabels ? (
          <div className="absolute left-0 right-0 top-12 flex flex-col items-start gap-2 rounded-lg bg-3BG px-2 py-2">
            <div className="flex w-full flex-col gap-2">
              {groupList.map((group: any) => {
                return (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm">{group.title.toLowerCase()}</p>
                      <button
                        onClick={() => {
                          // TODO Create a conditional and after the user agrees we can delete the group
                          deleteGroup(group.id);
                        }}
                      >
                        <DeleteOutlineRoundedIcon />
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
            {groupList.length <= 0 ? (
              <div className="flex w-full justify-center">
                <button
                  onClick={() => {
                    dispatch(handleCreateTaskGroupModal(!createGroupModal));
                  }}
                  className="rounded-lg bg-4BG px-3 py-2 text-sm"
                >
                  Create group
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default GroupFilter;
