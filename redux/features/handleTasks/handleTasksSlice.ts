import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface TasksState {
  createTaskFormModalState: boolean;
  priorityFilter: string;
  taskPriority: string;
  setTaskPriorityState: boolean;
  groupFilter: string;
  taskGroup: string;
  setTaskGroupState: boolean;
  handleEditTaskModal: boolean;
  taskStatus: string;
  taskStatusModal: boolean;
}

const initialState: TasksState = {
  createTaskFormModalState: false,
  priorityFilter: "",
  taskPriority: "",
  setTaskPriorityState: false,
  groupFilter: "",
  taskGroup: "",
  setTaskGroupState: false,
  handleEditTaskModal: false,
  taskStatus: "To do",
  taskStatusModal: false,
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
    // ** Group filters
    setGroupFilter: (state, action) => {
      state.groupFilter = action.payload;
    },
    setTaskGroup: (state, action) => {
      state.taskGroup = action.payload;
    },
    handleTaskGroupState: (state, action) => {
      state.setTaskGroupState = action.payload;
    },
    handleEditTaskModal: (state, action) => {
      state.handleEditTaskModal = action.payload;
    },
    setTaskStatus: (state, action) => {
      state.taskStatus = action.payload;
    },
    handleTaskStatusModal: (state, action) => {
      state.taskStatusModal = action.payload;
    },
  },
});

export const {
  setPriorityFilter,
  handleCreateTaskModalState,
  setTaskPriority,
  handleSetTaskPriorityState,
  setGroupFilter,
  setTaskGroup,
  handleTaskGroupState,
  handleEditTaskModal,
  setTaskStatus,
  handleTaskStatusModal,
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

// ** Group filtering
export const groupFilterValue = (state: RootState): string => {
  return state.handleTaskSlice.groupFilter;
};

export const TaskGroupValue = (state: RootState): string => {
  return state.handleTaskSlice.taskGroup;
};

export const setTaskGroupModalValue = (state: RootState): boolean => {
  return state.handleTaskSlice.setTaskGroupState;
};

export const editTaskModalValue = (state: RootState): boolean => {
  return state.handleTaskSlice.handleEditTaskModal;
};

export const taskStatusValue = (state: RootState): string => {
  return state.handleTaskSlice.taskStatus;
};

export const taskStatusModalValue = (state: RootState): boolean => {
  return state.handleTaskSlice.taskStatusModal;
};

export default handleTasksSlice.reducer;
