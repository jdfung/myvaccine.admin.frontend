import { createSlice } from "@reduxjs/toolkit";


export const VaccCentreReducer = createSlice({
    name: 'VaccCentre',
    initialState: {
        VaccCentre: []
    },
    reducers: {
        setVaccCentre: (state, action) => {
            return {...state, VaccCentre: [...action.payload]}
        }
    }
})

export const {setVaccCentre} = VaccCentreReducer.actions;
export default VaccCentreReducer.reducer;