import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from "./firebaseService";
import { combineReducers } from '@reduxjs/toolkit';

const initialState = {
  status: 'none',
  currentUserEmail: '',
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (params) => {
      const response = await login(params.auth, params.registerEmail, params.registerPassword);
      // The value we return becomes the `fulfilled` action payload
      console.log('login auth RESP:', response.user)
      return response.user.email;
    }
  );

export const loginSlice = createSlice({
    name: 'userAuthentication',
    initialState,
    reducers: {
        setLoggedUser:  (state, action) => {
            state.currentUserEmail = action.payload;
        }
    }, 
    extraReducers: (builder) => {
      builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("VLAD", action)
        state.status = 'idle';
        state.currentUserEmail = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'rejected';
      })
    }
  })

  export const currentUserFromState = (state) => state.userAuthentication.currentUserEmail;
  export const authStatus = (state) => {console.log('stateeeeee: ', state); return state.userAuthentication.status;}

  export default loginSlice.reducer;

//   export default combineReducers({
//     loginSlice: loginSlice.reducer,
//     setLoggedUserSlice: loginSlice.actions
// });

export const todoActions = {
    ...loginSlice.actions
  }