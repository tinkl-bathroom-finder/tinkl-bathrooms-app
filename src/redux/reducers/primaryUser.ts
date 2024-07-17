import { createSlice } from "@reduxjs/toolkit";

//Types
import { UserType } from "../../types/userType";

const initialState: UserType = {
    username: '',
    is_admin: false,
    is_removed: false,
    location: {
        lat: 0,
        lng: 0,
    }
}

const primaryUser = createSlice({
    name: 'primaryUser',
    initialState: initialState,
    reducers: {
        setUserNull: (state) => {
            state = initialState;
        },
        setUser: (state, action) => {
            // console.log('setUser action', action.payload);
            state = action.payload;
        },
        setUserLocation: (state, action) => {
            // console.log('Location Reducer action', action.payload);
            state.location = action.payload;
        },
    }
});

export const {
    setUserNull,
    setUser,
    setUserLocation,
} = primaryUser.actions;

export default primaryUser.reducer;