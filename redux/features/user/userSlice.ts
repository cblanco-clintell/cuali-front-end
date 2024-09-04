import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}

// UserState is either User or null, allowing for an uninitialized state.
type UserState = User | null;

// Initial state explicitly set to null, matching the UserState type.
const initialState: UserState = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    username: "johndoe",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Ensuring the state can be updated or reset to null.
        setUser: (state, action: PayloadAction<User>) => {
            // Directly return the user object from the action payload, updating the state.
            return action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
