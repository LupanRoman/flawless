import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import handleProjectReducer from "@redux/features/handleProjects/handleProjectSlice";
import handleTaskReducer from "@redux/features/handleTasks/handleTasksSlice";

export const store = configureStore({
  reducer: {
    handleProjectSlice: handleProjectReducer,
    handleTaskSlice: handleTaskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
