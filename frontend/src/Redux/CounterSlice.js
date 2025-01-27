import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incrementproduct: (state,action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += action.payload
        },
        decrementProduct: (state,action) => {
            state.value -= action.payload
        },
        // incrementByAmount: (state, action) => {
        //     console.log(initialState);
        //     state.value += action.payload
        // },
        // multipy: (state) => {
        //     state.value *= 5
        // }
    },
})

// Action creators are generated for each case reducer function
export const { incrementproduct, decrementProduct} = counterSlice.actions

export default counterSlice.reducer