import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const bathroomDetails = createSlice({
    name: 'bathroomDetails',
    initialState: initialState,
    reducers: {
        setAllBathroomsData: (state) => {
            state = action.payload;
        }
    }
});

export const {
    setAllBathroomsData,
} = bathroomDetails.actions;

export default bathroomDetails.reducer;