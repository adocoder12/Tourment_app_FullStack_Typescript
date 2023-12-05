/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { Iauth, Iuser } from "@/utils/interfaces/user";
import { ITeam } from "@/utils/interfaces/team";

import { RootState } from "../store";
import { register, login } from "../services/auth";
import { getUserTeam } from "../services/user";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

export interface UserState {
  loading: boolean;
  user?: Iauth | undefined;
  myteam: ITeam[] | undefined;
  error: string | undefined;
  token: string | undefined;
  message?: string;
}

const initialState: UserState = {
  loading: false,
  user: storedUser ? JSON.parse(storedUser) : undefined,
  myteam: undefined,
  error: undefined,
  token: storedToken || undefined,
  message: "",
};

console.log("initialState", initialState.user?.myTeam);
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.user = {};
      state.token = "";
      state.error = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user as Iuser;
        state.token = action.payload?.token as string;
        state.message = action.payload?.message as string;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.token = "";
        state.user = {};
      })

      /* ------LOGIN------------*/
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload?.user as Iuser;
        state.token = payload?.token as string;

        state.message = payload?.message as string;
        state.error = "";
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.loading = false;
        state.user = {};
        state.token = "";
      })
      /* ------GET USER TEAM------------*/
      .addCase(getUserTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserTeam.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.myteam = payload?.team as ITeam[];
        state.message = payload?.message as string;
      })
      .addCase(getUserTeam.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
        state.myteam = undefined;
      });
  },
});

export const { logout } = userSlice.actions;

export const userSelector = (state: RootState) => state.auth;

export default userSlice.reducer;
