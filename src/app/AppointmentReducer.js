import { createSlice } from "@reduxjs/toolkit";

export const AppointmentsReducer = createSlice({
    name: 'Appointments',
    initialState: {
        Appointments: [], 
        Appointment: []
        
    },
    reducers: {
        setAppointments: (state, action) => {
            return {...state, Appointments: [...action.payload]}
        },
        setAppointment: (state, action) => {
            return {...state, Appointment: action.payload}
        }
    }
});

export const {setAppointments, setAppointment} = AppointmentsReducer.actions;
export default AppointmentsReducer.reducer;