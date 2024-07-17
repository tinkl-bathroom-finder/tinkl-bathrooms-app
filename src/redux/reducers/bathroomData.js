import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [];

const bathroomData = createSlice({
    name: 'bathroomData',
    initialState: initialState,
    reducers: {
        setAllBathroomsData: (state, action) => {
            return state = action.payload;
        }
    }
});

export const {
    setAllBathroomsData,
} = bathroomData.actions;

export default bathroomData.reducer;