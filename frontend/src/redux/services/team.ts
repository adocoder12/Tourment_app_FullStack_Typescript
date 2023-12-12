import { ITeam } from "@/utils/interfaces/team";
import { createAsyncThunk } from "@reduxjs/toolkit";

//get team by name

const getTeamByName = createAsyncThunk(
  "user/teams/getTeamByName",
  async (id: string, { rejectWithValue }) => {
    if (!id) {
      return rejectWithValue("name is required");
    }
    const response = await fetch(
      `http://localhost:8080/api/v1/users/getUserTeams/${id}`
    );
    const data = await response.json();

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

//get team by id

const getTeamById = createAsyncThunk(
  "user/teams/getTeam",
  async (id: string, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/teams/getTeam/${id}`
    );
    const data = await response.json();

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

    if (response.ok) {
      const teams: ITeam[] = data;

      const teamData = {
        teams: teams,
      };
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
    if (!response.ok) {
      return rejectWithValue(data.error.message);
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
export {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam,
  getTeamById,
  getTeamByName,
};
