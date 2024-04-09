import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface ProjectState {
  createProjectModalState: boolean;
  controlProjectModalState: boolean;
  editProjectModalState: boolean;
}

const initialState: ProjectState = {
  createProjectModalState: false,
  controlProjectModalState: false,
  editProjectModalState: false,
};

export const handleProjectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    handleCreateProjectModal: (state, action) => {
      state.createProjectModalState = action.payload;
    },
    handleControlProjectModal: (state, action) => {
      state.controlProjectModalState = action.payload;
    },
    handleEditProjectModal: (state, action) => {
      state.editProjectModalState = action.payload;
    },
  },
});

export const {
  handleCreateProjectModal,
  handleControlProjectModal,
  handleEditProjectModal,
} = handleProjectsSlice.actions;

export const createProjectModalState = (state: RootState): boolean => {
  return state.handleProjectSlice.createProjectModalState;
};

export const controlProjectModalValue = (state: RootState): boolean => {
  return state.handleProjectSlice.controlProjectModalState;
};

export const editProjectModalValue = (state: RootState): boolean => {
  return state.handleProjectSlice.editProjectModalState;
};

export default handleProjectsSlice.reducer;
