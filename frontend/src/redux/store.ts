import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicer/authSlicer";
import categoryReducer from "./slicer/categorySlicer";
import playerSlicer from "./slicer/playerSlicer";
import teamSlicer from "./slicer/teamSlicer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    players: playerSlicer,
    teams: teamSlicer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
