import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    language: 'en'
  };

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
  })
  
export const { setLanguage } = languageSlice.actions;

export const languageFromState = (state) => {console.log('LLLLLL state', state); return state.language}

export default languageSlice.reducer;