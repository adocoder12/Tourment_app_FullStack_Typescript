import { Middleware } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store"; // Adjust the path based on your project structure

const getToken = (): string | null => {
  // Retrieve the token from your storage (local storage in this case)
  return localStorage.getItem("token");
};

const addTokenToHeaders = (
  headers: Record<string, string>
): Record<string, string> => {
  const token = getToken();

  if (token) {
    // Add the token to the Authorization header
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const middlewareWithToken: Middleware<{}, RootState, AppDispatch> =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (typeof action === "function") {
      const tokenHeaders = addTokenToHeaders({});

      // Pass the modified headers to the fetch request
      action = action({ ...tokenHeaders });
    }

    return next(action);
  };
