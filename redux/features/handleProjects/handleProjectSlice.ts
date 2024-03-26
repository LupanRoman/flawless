import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface ProjectState {}

const initialState: ProjectState = {};

export const handleProjectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
});

export const {} = handleProjectsSlice.actions;

export default handleProjectsSlice.reducer;
