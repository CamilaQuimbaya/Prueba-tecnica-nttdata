import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Este archivo es para manejar el estado de autenticación en Redux
// Se crea un slice de autenticación que maneja el token del usuario

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Guarda el token en localStorage
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem('token'); // Elimina el token de localStorage
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
