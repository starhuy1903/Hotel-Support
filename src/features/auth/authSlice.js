import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: localStorage.getItem('token') || null, history: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', state.token);
    },

    setUser: (state, action) => {
      state.user = action.payload.user;
    },

    setHistory: (state, action) => {
      state.history = action.payload.history;
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.setItem('token', null);
    },
  },
});

export const { setToken, setUser, setHistory, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentHistory = (state) => state.auth.history;
