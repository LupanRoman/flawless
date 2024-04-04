import EditTask from "@/components/workspace/tasks/editTask";
import Modal from "@/components/workspace/tasks/modal";
import { createClient } from "@/utils/supabase/server";
import React from "react";

type Props = {};

async function page({ params: { slug } }: { params: { slug: number } }) {
  return (
    <>
      <Modal>
        <EditTask slug={slug} />
      </Modal>
    </>
  );
}

export default page;
