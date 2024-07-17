import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BathroomType } from "../../types/BathroomType";

const initialState: BathroomType[] = [];

const bathroomData = createSlice({
    name: 'bathroomData',
    initialState: initialState,
    reducers: {
        setAllBathroomsData: (state, action: PayloadAction<BathroomType[]>) => {
            return state = action.payload;
        }
    }
});

export const {
    setAllBathroomsData,
} = bathroomData.actions;

export default bathroomData.reducer;