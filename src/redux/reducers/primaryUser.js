import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
            console.log('setUser action', action.payload);
            state = action.payload;
        }
    }
});

export const {
    setUserNull,
    setUser,
} = primaryUser.actions;

export default primaryUser.reducer;