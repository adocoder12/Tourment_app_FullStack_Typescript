import { createAsyncThunk } from "@reduxjs/toolkit";

//interfaces

import { Icategory } from "@/utils/interfaces/category";

const getCategories = createAsyncThunk(
  "user/getCategories",
  async (_, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:8080/api/v1/categories/getCategories"
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const categories: Icategory[] = data;
      return {
        categories: categories,
      };
    }
    return rejectWithValue(data.error);
  }
);

const createCategory = createAsyncThunk(
  "user/createCategory",
  async (name: string, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:8080/api/v1/categories/createCategory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const category: Icategory = data.category;
      const message: string = data.message;

      return {
        category: category,
        message: message,
      };
    }
    return rejectWithValue(data.error);
  }
);

const deleteCategory = createAsyncThunk(
  "user/deleteCategory",
  async (id: string, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/categories/deleteCategory/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      const category: Icategory[] = data;
      return {
        category: category,
      };
    }
    return rejectWithValue(data.error);
  }
);

export { getCategories, createCategory, deleteCategory };
