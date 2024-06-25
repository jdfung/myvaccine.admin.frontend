import { createSlice } from "@reduxjs/toolkit";


export const VaccCentreReducer = createSlice({
    name: 'VaccCentre',
    initialState: {
        VaccCentre: [],
        SpeciVaccCentre: [], 
        States: [],
        Districts: []
    },
    reducers: {
        setVaccCentre: (state, action) => {
            return {...state, VaccCentre: [...action.payload]}
        },
        setSpeciVaccCentre: (state, action) => {
            return {...state, SpeciVaccCentre: action.payload}
        },
        setAllStates: (state, action) => {
            return {...state, States: [...action.payload]}
        },
        setAllDistricts: (state, action) => {
            return {...state, Districts: action.payload}
        },
        reset: (state) => {
            return {...state, VaccCentre: []}
        }
    }
})

export const {setVaccCentre, setSpeciVaccCentre, setAllStates, setAllDistricts, reset} = VaccCentreReducer.actions;
export default VaccCentreReducer.reducer;