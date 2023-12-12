import { IPlayer } from "@/utils/interfaces/players";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getPlayer = createAsyncThunk(
  "user/players/getPlayer/:id",
  async (id: string, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/players/getPlayer/${id}`
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const playerData = {
        player: data.player,
        message: data.message,
      };
      return playerData;
    }
    return rejectWithValue(data.error);
  }
);

const getPlayers = createAsyncThunk(
  "user/players/getPlayers",
  async (_, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:8080/api/v1/players/getPlayers"
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const players: IPlayer[] = data;
      return {
        players: players,
      };
    }
    return rejectWithValue(data.error.message);
  }
);

// createPlayer
const createPlayer = createAsyncThunk(
  "user/players/addPlayer",
  async (formData: FormData, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:8080/api/v1/players/createPlayer",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const player: IPlayer = data.player;
      const message: string = data.message;
      return {
        player: player,
        message: message,
      };
    }
    return rejectWithValue(data.error.message);
  }
);

const updatePlayer = createAsyncThunk(
  "user/players/updatePlayer",
  async (player: IPlayer, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:8080/api/v1/players/updatePlayer",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player),
      }
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const player: IPlayer = data.player;
      const message: string = data.message;
      return {
        player: player,
        message: message,
      };
    }
    return rejectWithValue(data.error.message);
  }
);

const deletePlayer = createAsyncThunk(
  "user/players/deletePlayer/:id",
  async (id: IPlayer, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/players/deletePlayer/${id}`
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const message: string = data;
      return {
        message: message,
      };
    }
    return rejectWithValue(data.error.message);
  }
);

export { getPlayers, createPlayer, updatePlayer, deletePlayer, getPlayer };
