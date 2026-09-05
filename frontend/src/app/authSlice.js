import { createSlice } from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('ep_token');
const storedUser = localStorage.getItem('ep_user');

const initialState = {
  token: storedToken || null,
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    credentialsSet(state, action) {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem('ep_token', token);
      localStorage.setItem('ep_user', JSON.stringify(user));
    },
    credentialsCleared(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('ep_token');
      localStorage.removeItem('ep_user');
    },
  },
});

export const { credentialsSet, credentialsCleared } = authSlice.actions;
export default authSlice.reducer;

export const selectToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
