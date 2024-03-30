import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface TasksState {
  priorityFilter: string;
}

const initialState: TasksState = {
  priorityFilter: "",
};

export const handleTasksSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
  },
});

export const { setPriorityFilter } = handleTasksSlice.actions;

export const priorityFilterValue = (state: RootState): string => {
  return state.handleTaskSlice.priorityFilter;
};

export default handleTasksSlice.reducer;
