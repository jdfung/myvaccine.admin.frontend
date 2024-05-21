import { configureStore } from '@reduxjs/toolkit';
import ApplicantsReducer from './ApplicantsReducer';
import AppointmentsReducer from './AppointmentReducer';
import VaccCentreReducer from './VaccCentreReducer';

export const store = configureStore({
  reducer: {
    ApplicantsReducer: ApplicantsReducer,
    AppointmentsReducer: AppointmentsReducer,
    VaccCentreReducer: VaccCentreReducer,
  },
});
