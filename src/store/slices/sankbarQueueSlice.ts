import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
export type SnackbarQueueType = "info" | "warning" | "error" | "success";
export interface SnackBar {
  key: string;
  content: string;
  type: SnackbarQueueType;
}
export interface SnackBarState {
  sankbarQueue: SnackBar[];
}
const initialState: SnackBarState = {
  sankbarQueue: [],
};
export const createDelay = createAsyncThunk<
  string,
  { key: string; delay?: number }
>("sankbarQueue/createDelay", async ({ key, delay }) => {
  const response = await new Promise<{ key: string; delay?: number }>(
    (resolve) => setTimeout(() => resolve({ key: key }), delay || 3700)
  );
  return response.key;
});
export const sankbarQueueSlice = createSlice({
  name: "sankbarQueue",
  initialState,
  reducers: {
    addToQueue: (
      state,
      action: PayloadAction<{ content: string; type: SnackbarQueueType }>
    ) => {
      state.sankbarQueue = [
        ...current(state.sankbarQueue),
        { ...action.payload, key: uuidv4() },
      ];
    },
    filterFromQueue: (state, action: PayloadAction<string>) => {
      state.sankbarQueue = current(state.sankbarQueue).filter(
        (snackbar) => snackbar.key !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createDelay.fulfilled, (state, action) => {
      state.sankbarQueue = current(state.sankbarQueue).filter(
        (snackbar) => snackbar.key !== action.payload
      );
    });
  },
});

export const { addToQueue, filterFromQueue } = sankbarQueueSlice.actions;

export default sankbarQueueSlice.reducer;
