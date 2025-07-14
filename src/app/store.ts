import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/slice';


// Este archivo es para configurar el store de Redux
// Se importa configureStore de @reduxjs/toolkit para crear el store
// Se importa el reducer de autenticación desde el slice de autenticación
// El store se configura con el reducer de autenticación
// Se exporta el store, el tipo RootState y el tipo AppDispatch para usarlos en la aplicación 
export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
