import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReposAction: any = createAsyncThunk(
  "repos/list",
  async (user: any, { rejectWithValue, getState, dispatch }: any) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${user}/repos?per_page=700&sort=asc`
      );
      return data;
    } catch (error: any) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response);
    }
  }
);

export const fetchProfileAction: any = createAsyncThunk(
  "profile/list",
  async (user: any, { rejectWithValue, getState, dispatch }: any) => {
    try {
      const { data } = await axios.get(`https://api.github.com/users/${user}`);
      return data;
    } catch (error: any) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response);
    }
  }
);

const reposSlices = createSlice({
  name: "repos",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    //repos
    builder.addCase(fetchReposAction.pending, (state: any, action) => {
      state.loading = true;
    });
    builder.addCase(fetchReposAction.fulfilled, (state: any, action) => {
      state.reposList = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchReposAction.rejected, (state: any, action) => {
      state.loading = false;
      state.reposList = undefined;
      state.error = action?.payload;
    });
    //profiles
    builder.addCase(fetchProfileAction.pending, (state: any, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProfileAction.fulfilled, (state: any, action) => {
      state.loading = false;
      state.profileList = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchProfileAction.rejected, (state: any, action) => {
      state.loading = false;
      state.profileList = undefined;
      state.error = action?.payload;
    });
  },
});

export default reposSlices.reducer;
