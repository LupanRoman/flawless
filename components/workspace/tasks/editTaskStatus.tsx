"use client";
import {
  handleTaskStatusModal,
  setTaskStatus,
  taskStatusModalValue,
  taskStatusValue,
} from "@/redux/features/handleTasks/handleTasksSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

type Props = {};

function EditTaskStatus({}: Props) {
  const dispatch = useAppDispatch();
  const taskStatusModal = useAppSelector(taskStatusModalValue);
  return (
    <>
      <div className="absolute top-10 z-20 flex flex-col items-start gap-2 rounded-lg bg-3BG px-2 py-1">
        <button
          onClick={() => {
            dispatch(setTaskStatus("To do"));
            dispatch(handleTaskStatusModal(!taskStatusModal));
          }}
        >
          To do
        </button>
        <button
          onClick={() => {
            dispatch(setTaskStatus("In progress"));
            dispatch(handleTaskStatusModal(!taskStatusModal));
          }}
        >
          In progress
        </button>
        <button
          onClick={() => {
            dispatch(setTaskStatus("Done"));
            dispatch(handleTaskStatusModal(!taskStatusModal));
          }}
        >
          Done
        </button>
      </div>
    </>
  );
}

export default EditTaskStatus;
