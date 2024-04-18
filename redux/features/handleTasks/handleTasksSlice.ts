import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface TasksState {
  createTaskFormModalState: boolean;
  priorityFilter: string;
  taskPriority: string;
  setTaskPriorityState: boolean;
  groupFilter: string;
  taskGroup: string;
  taskGroupID: number;
  setTaskGroupState: boolean;
  createGroupModalState: boolean;
  handleEditTaskModal: boolean;
  taskStatus: string;
  taskStatusModal: boolean;
  workspaceActions: boolean;
  groupIDFilter: number;
}

const initialState: TasksState = {
  createTaskFormModalState: false,
  priorityFilter: "",
  taskPriority: "",
  setTaskPriorityState: false,
  groupFilter: "",
  taskGroup: "",
  taskGroupID: 0,
  setTaskGroupState: false,
  createGroupModalState: false,
  handleEditTaskModal: false,
  taskStatus: "To do",
  taskStatusModal: false,
  workspaceActions: false,
  groupIDFilter: 0,
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
    setTaskGroupID: (state, action) => {
      state.taskGroupID = action.payload;
    },
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
    handleWorkspaceActions: (state, action) => {
      state.workspaceActions = action.payload;
    },
    handleCreateTaskGroupModal: (state, action) => {
      state.createGroupModalState = action.payload;
    },
    handleGroupIDFilter: (state, action) => {
      // Set the id of the group to filter tasks
      state.groupIDFilter = action.payload;
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
  handleWorkspaceActions,
  handleCreateTaskGroupModal,
  setTaskGroupID,
  handleGroupIDFilter,
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

export const setTaskGroupIDValue = (state: RootState): number => {
  return state.handleTaskSlice.taskGroupID;
};

export const groupFilterValue = (state: RootState): string => {
  return state.handleTaskSlice.groupFilter;
};

export const taskGroupValue = (state: RootState): string => {
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

export const workspaceActionsModalState = (state: RootState): boolean => {
  return state.handleTaskSlice.workspaceActions;
};

export const createGroupModalValue = (state: RootState): boolean => {
  return state.handleTaskSlice.createGroupModalState;
};

export const groupIDFilterValue = (state: RootState): number => {
  return state.handleTaskSlice.groupIDFilter;
};

export default handleTasksSlice.reducer;
