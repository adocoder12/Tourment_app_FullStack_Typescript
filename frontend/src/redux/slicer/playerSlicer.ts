import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
//interfaces
import { IPlayer } from "@/utils/interfaces/players";

//services
import {
  createPlayer,
  getPlayers,
  updatePlayer,
  deletePlayer,
  getPlayer,
} from "@redux/services/player";

export interface categoryState {
  loading: boolean;
  player?: IPlayer | undefined;
  players?: IPlayer[] | undefined;
  error: string | undefined;
  message?: string | undefined;
}

const initialState: categoryState = {
  loading: false,
  players: undefined,
  player: undefined,
  error: undefined,
  message: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlayer.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.player = payload.player as IPlayer;
        state.message = payload.message as string;
      })
      .addCase(createPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.players = undefined;
      })
      //add getPlayers
      .addCase(getPlayers.pending, (state) => {
        state.loading = true;
      })

      .addCase(getPlayers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.players = payload.players as IPlayer[];
      })
      .addCase(getPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.players = undefined;
      })
      //add updatePlayer
      .addCase(updatePlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlayer.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.player = payload.player as IPlayer;
        state.message = payload.message as string;
      })
      .addCase(updatePlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.player = undefined;
      })
      //deletePlayer
      .addCase(deletePlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlayer.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message as string;
      })
      .addCase(deletePlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.message = "";
      })
      //get player
      .addCase(getPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlayer.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.player = payload.player as IPlayer;
      })
      .addCase(getPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.player = undefined;
      });
  },
});

// export const { logout } = userSlice.actions;

export const userSelector = (state: RootState) => state.players;

export default playerSlice.reducer;
