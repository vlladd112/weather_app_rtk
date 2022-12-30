import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'none'
};

export const loginSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
      setLoginStatus: (state, action) => {
        console.log('YYYYYYYYY', action);
            state.status = action.payload;
        },
    }
  })
  
export const { setLoginStatus } = loginSlice.actions;

export const loginStatusFromState = (state) => {console.log("CIOIOCIOCIOCI", state); return state.loginStatus.status;}

export default loginSlice.reducer;