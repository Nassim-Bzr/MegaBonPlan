export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      loginSuccess: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.status = 'succeeded';
      },
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.status = 'idle';
      },
      setAuthError: (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      }
    }
  });
  
  export const { loginSuccess, logout, setAuthError } = authSlice.actions;
  