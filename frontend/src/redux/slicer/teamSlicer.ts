import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
//interfaces
import { ITeam } from "@/utils/interfaces/team";

//services
import {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam,
  getTeam,
  getTeamByName,
} from "@redux/services/team";

interface initialState {
  loading: boolean;
  team?: ITeam | undefined;
  teams?: ITeam[] | undefined;
  error: string | undefined;
  message?: string;
}

const initialState: initialState = {
  loading: false,
  team: undefined,
  teams: undefined,
  error: undefined,
  message: "",
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTeam.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.team = payload.team as ITeam;
        state.message = payload.message as string;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.team = undefined;
      })
      //add getTeams
      .addCase(getTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeams.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.teams = payload.teams as ITeam[];
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.teams = undefined;
      })
      //getTeam by name
      .addCase(getTeamByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeamByName.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.team = payload?.team as ITeam;
      })
      .addCase(getTeamByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.team = undefined;
      })

      //getTeam
      .addCase(getTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeam.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.team = payload?.team as ITeam;
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.team = undefined;
      })
      //add updateTeam
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTeam.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.team = payload.team as ITeam;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.team = undefined;
      })
      //add deleteTeam
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTeam.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.team = payload.team as ITeam;
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.team = undefined;
      });
  },
});

// export const {  } = userSlice.actions;

export const userSelector = (state: RootState) => state.teams;

export default teamSlice.reducer;
