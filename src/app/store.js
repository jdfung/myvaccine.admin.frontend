import { configureStore } from '@reduxjs/toolkit';
import ApplicantsReducer from './ApplicantsReducer';
import AppointmentsReducer from './AppointmentReducer';

export const store = configureStore({
  reducer: {
    ApplicantsReducer: ApplicantsReducer,
    AppointmentsReducer: AppointmentsReducer
  },
});
