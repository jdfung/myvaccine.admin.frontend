import { createSlice } from "@reduxjs/toolkit";


export const VaccCentreReducer = createSlice({
    name: 'VaccCentre',
    initialState: {
        VaccCentre: [],
        SpeciVaccCentre: []
    },
    reducers: {
        setVaccCentre: (state, action) => {
            return {...state, VaccCentre: [...action.payload]}
        },
        setSpeciVaccCentre: (state, action) => {
            return {...state, SpeciVaccCentre: action.payload}
        }
    }
})

export const {setVaccCentre} = VaccCentreReducer.actions;
export default VaccCentreReducer.reducer;