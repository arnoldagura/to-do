import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { taskSlice } from "./task";

export const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
