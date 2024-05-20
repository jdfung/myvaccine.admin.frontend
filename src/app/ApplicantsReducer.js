import { createSlice } from "@reduxjs/toolkit";

export const ApplicantsReducer = createSlice({
    name: 'Applicants',
    initialState: {
        Applicants: [], 
        Applicant: []
    },
    reducers: {
        setApplicants: (state, action) => {
            return {...state, Applicants: [...action.payload]}
        },
        setSpeciApplicants: (state, action) => {
            return {...state, Applicant: action.payload}
        }
    }
});

export const {setApplicants, setSpeciApplicants} = ApplicantsReducer.actions;
export default ApplicantsReducer.reducer;