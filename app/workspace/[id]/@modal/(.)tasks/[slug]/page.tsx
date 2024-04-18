import EditTask from "@/components/workspace/tasks/editTask";
import Modal from "@/components/workspace/tasks/modal";
import { createClient } from "@/utils/supabase/server";
import React from "react";

type Props = {};

async function page({ params: { slug } }: { params: { slug: number } }) {
  const supabase = createClient();
  const { data: TaskGroupID, error } = await supabase
    .from("Tasks")
    .select("group_id")
    .eq("id", slug);
  return (
    <>
      <Modal>
        <EditTask slug={slug} taskGroupID={TaskGroupID} />
      </Modal>
    </>
  );
}

export default page;
