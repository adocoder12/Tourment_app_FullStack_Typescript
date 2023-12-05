import { createAsyncThunk } from "@reduxjs/toolkit";
//interfaces
import { ITeam } from "@/utils/interfaces/team";

const getUserTeam = createAsyncThunk(
  "user/teams/getUserTeam",
  async (id: string, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/teams/getTeam/${id}`
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const team: ITeam = data.team;
      const message: string = data.message;

      const teamData = {
        team: team,
        message: message,
      };
      return teamData;
    }
    return rejectWithValue(data.error.message);
  }
);

export { getUserTeam };
