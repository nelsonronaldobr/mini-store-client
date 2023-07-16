import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthResponse, InitialStateAuth } from '../interfaces';

const initialState = {
    sessionStatus: 'checking',
    user: {},
    loading: false
} as InitialStateAuth;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.sessionStatus = 'checking';
        },
        loginSuccess(state, { payload }: PayloadAction<AuthResponse>) {
            state.user = payload.user;
            state.loading = false;
            state.tokenSession = payload.tokenSession;
            localStorage.setItem('tokenSession', payload.tokenSession);
            state.sessionStatus = 'authenticated';
        },
        registerError(state) {
            state.loading = false;
        },
        registerStart(state) {
            state.loading = true;
        },
        registerSuccess(state) {
            state.loading = false;
        },
        logout(state) {
            state.user = null;
            state.sessionStatus = 'not-authenticated';
            state.tokenSession = null;
            localStorage.removeItem('tokenSession');
            state.loading = false;
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    logout,
    registerStart,
    registerSuccess,
    registerError
} = authSlice.actions;
//export const authReducer = authSlice.reducer
