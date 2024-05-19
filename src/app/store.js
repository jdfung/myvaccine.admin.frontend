import { configureStore } from '@reduxjs/toolkit';
import ApplicantsReducer from './ApplicantsReducer';

export const store = configureStore({
  reducer: {
    ApplicantsReducer: ApplicantsReducer
  },
});
