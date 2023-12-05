import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
//interfaces
import { Icategory } from "@/utils/interfaces/category";

import { getCategories } from "../services/category";

export interface categoryState {
  loading: boolean;
  categories?: Icategory[] | undefined;
  error: string | undefined;
  message?: string;
}

const initialState: categoryState = {
  loading: false,
  categories: undefined,
  error: undefined,
  message: "",
};
const categorySlicer = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload.categories as Icategory[];
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.categories = undefined;
      });
  },
});

// export const { logout } = userSlice.actions;

export const userSelector = (state: RootState) => state.categories;

export default categorySlicer.reducer;
