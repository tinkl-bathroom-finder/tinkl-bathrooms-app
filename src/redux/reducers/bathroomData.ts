import { createSlice } from "@reduxjs/toolkit";
import { BathroomType } from "../../types/BathroomType";

const initialState: BathroomType | null = null;

const bathroomData = createSlice({
    name: 'bathroomDetails',
    initialState: initialState,
    reducers: {
        setAllBathroomsData: (state, action) => {
            state = action.payload;
        }
    }
});

export const {
    setAllBathroomsData,
} = bathroomData.actions;

export default bathroomData.reducer;