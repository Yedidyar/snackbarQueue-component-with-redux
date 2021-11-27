import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import snackbarQueueReducer from "../store/slices/sankbarQueueSlice";

export const store = configureStore({
  reducer: {
    snackbarQueue: snackbarQueueReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
