import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface TasksState {
  createTaskFormModalState: boolean;
  priorityFilter: string;
  taskPriority: string;
  setTaskPriorityState: boolean;
}

const initialState: TasksState = {
  createTaskFormModalState: false,
  priorityFilter: "",
  taskPriority: "",
  setTaskPriorityState: false,
};

export const handleTasksSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    handleCreateTaskModalState: (state, action) => {
      state.createTaskFormModalState = action.payload;
    },
    // !! Used when filtering tasks
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
    // !! Used when creating a task and setting the priority
    setTaskPriority: (state, action) => {
      state.taskPriority = action.payload;
    },
    handleSetTaskPriorityState: (state, action) => {
      state.setTaskPriorityState = action.payload;
    },
  },
});

export const {
  setPriorityFilter,
  handleCreateTaskModalState,
  setTaskPriority,
  handleSetTaskPriorityState,
} = handleTasksSlice.actions;

export const priorityFilterValue = (state: RootState): string => {
  return state.handleTaskSlice.priorityFilter;
};

export const createTaskModalValue = (state: RootState): boolean => {
  return state.handleTaskSlice.createTaskFormModalState;
};

export const TaskPriorityValue = (state: RootState): string => {
  return state.handleTaskSlice.taskPriority;
};

export const setTaskPriorityModalValue = (state: RootState): boolean => {
  return state.handleTaskSlice.setTaskPriorityState;
};

export default handleTasksSlice.reducer;
