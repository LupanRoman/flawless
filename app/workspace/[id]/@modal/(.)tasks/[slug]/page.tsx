import EditTask from "@/components/workspace/tasks/editTask";
import Modal from "@/components/workspace/tasks/modal";
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
