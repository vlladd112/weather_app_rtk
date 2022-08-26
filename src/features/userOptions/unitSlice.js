import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    unit: 'metric'
  };

export const unitSlice = createSlice({
    name: 'unit',
    initialState,
    reducers: {
        setUnit: (state, action) => {
            state.unit = action.payload;
        },
    }
  })

  
export const { setUnit } = unitSlice.actions;

export const unitFromState = (state) => {console.log('UUUUUUUUUU state', state); return state.unit}

export default unitSlice.reducer;