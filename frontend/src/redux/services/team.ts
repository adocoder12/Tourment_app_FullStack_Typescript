import { ITeam } from "@/utils/interfaces/team";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getTeam = createAsyncThunk(
  "user/teams/getTeam",
  async (id: string, { rejectWithValue }) => {
    if (!id) {
      console.log("id is required");
      return rejectWithValue("id is required");
    }
    const response = await fetch(
      `http://localhost:8080/api/v1/teams/getTeam/${id}`
    );
    const data = await response.json();
    console.log("data as", data);

    if (response.ok) {
      const team: ITeam = data.team;
      const message: string = data.message;

      return {
        team: team,
        message: message,
      };
    }
    return rejectWithValue(data.error);
  }
);

const getTeams = createAsyncThunk(
  "user/teams/getTeams",
  async (_, { rejectWithValue }) => {
    const response = await fetch("http://localhost:8080/api/v1/teams/getTeams");
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const teams: ITeam[] = data;

      const teamData = {
        teams: teams,
      };
      console.log("teams", teamData);

      return teamData;
    }
    return rejectWithValue(data.error);
  }
);

const createTeam = createAsyncThunk(
  "user/teams/addTeam",
  async (formData: FormData, { rejectWithValue }) => {
    const response = await fetch("http://localhost:8080/api/v1/teams/addTeam", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      return rejectWithValue(data.error.error.message);
    }
    const team: ITeam[] = data.team;
    const message: string = data.message;
    return {
      team: team,
      message: message,
    };
  }
);

const updateTeam = createAsyncThunk(
  "user/teams/updateTeam",
  async (team: ITeam, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:8080/api/v1/teams/updateTeam",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(team),
      }
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const team: ITeam[] = data;
      return {
        team: team,
      };
    }
    return rejectWithValue(data.error.message);
  }
);
const deleteTeam = createAsyncThunk(
  "user/teams/deleteTeam",
  async (id: string, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/teams/deleteTeam/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const team: ITeam[] = data;
      return {
        team: team,
      };
    }
    return rejectWithValue(data.error.error.message);
  }
);
export { createTeam, getTeams, updateTeam, deleteTeam, getTeam };
