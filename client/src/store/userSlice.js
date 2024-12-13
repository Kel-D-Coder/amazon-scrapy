import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null
    },

    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload
            console.log(state.currentUser)
        },

        clearUser: (state) => {
            state.currentUser = null;
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer