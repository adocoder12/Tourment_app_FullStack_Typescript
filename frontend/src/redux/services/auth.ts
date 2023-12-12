import { createAsyncThunk } from "@reduxjs/toolkit";
import base64 from "base-64";
import { jwtDecode } from "jwt-decode";
//interfaces
import { Iauth } from "@/utils/interfaces/user";
import { IErrorResponse } from "@/utils/interfaces/dbResponse";

const register = createAsyncThunk(
  "user/register",
  async (user: Iauth, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        // if (data.error) {
        //   console.log("data", data.error);
        //   return rejectWithValue(data.error.message);
        // }
        const recivedUser = data.data.user;
        return {
          user: recivedUser,
          token: data.data.token,
          message: data.data.message,
        };
      }
      return rejectWithValue(data.error.message);
    } catch (error) {
      if ((error as Error).message && (error as IErrorResponse).message) {
        console.log(
          `(error as Error).message ${(error as IErrorResponse).message}`
        );
        console.log(`(error as Error).message ${(error as Error).message}`);
        return rejectWithValue((error as IErrorResponse).message);
      } else {
        return rejectWithValue((error as Error).message);
      }
    }
  }
);

const login = createAsyncThunk(
  "user/login",
  async ({ username, password }: Iauth, { rejectWithValue }) => {
    const response = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + base64.encode(username + ":" + password),
      },
    });

    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const token = data.token;

      const decoded = jwtDecode(token);
      console.log("decoded", decoded);

      localStorage.setItem("user", JSON.stringify(decoded));
      localStorage.setItem("token", data.token);

      const userInfo = {
        user: decoded,
        token: data.token,
        message: data.message,
      };
      return userInfo;
    }
    return rejectWithValue(data.error.message);
  }
);

export { register, login };
