import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface ProjectState {
  createProjectModalState: boolean;
}

const initialState: ProjectState = {
  createProjectModalState: false,
};

export const handleProjectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    handleCreateProjectModal: (state, action) => {
      state.createProjectModalState = action.payload;
    },
  },
});

export const { handleCreateProjectModal } = handleProjectsSlice.actions;

export const createProjectModalState = (state: RootState): boolean => {
  return state.handleProjectSlice.createProjectModalState;
};

export default handleProjectsSlice.reducer;
