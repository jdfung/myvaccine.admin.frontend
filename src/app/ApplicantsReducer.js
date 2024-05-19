import { createSlice } from "@reduxjs/toolkit";

export const ApplicantsReducer = createSlice({
    name: 'Applicants',
    initialState: {
        Applicants: []
    },
    reducers: {
        setApplicants: (state, action) => {
            return {...state, Applicants: [...action.payload]}
        },
    }
});

export const {setApplicants} = ApplicantsReducer.actions;
export default ApplicantsReducer.reducer;