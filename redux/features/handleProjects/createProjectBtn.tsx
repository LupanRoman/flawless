import React from "react";

type Props = {};

function CreateProjectBtn({}: Props) {
  return (
    <>
      <button className="bg-brandColor font-bold text-base rounded-[10px] px-5 py-2">
        Create project
      </button>
    </>
  );
}

export default CreateProjectBtn;
