import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

const initialState = {
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    isUserLoggedIn: false,
    userData: null,
    error: "",
    signupError: "",
    loginError: "",
    logoutError: "",
};

// signup
export const signup = createAsyncThunk("auth/signup", async (data) => {
    const session = await authService.createAccount(data);
    if (session) {
        const response = await authService.getCurrentUser();
        if (response) {
            const avatar = authService.getAvatarInitials(response.name);
            return { ...response, avatar };
        }
    }
});

// login
export const login = createAsyncThunk("auth/login", async (data) => {
    const session = await authService.login(data);
    if (session) {
        const response = await authService.getCurrentUser();
        if (response) {
            const avatar = authService.getAvatarInitials(response.name);
            return { ...response, avatar };
        }
    }
});

// logout
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

// current user
export const currentUser = createAsyncThunk("auth/currentUser", async () => {
    const response = await authService.getCurrentUser();
    if (response) {
        const avatar = authService.getAvatarInitials(response.name);
        return { ...response, avatar };
    }
});

// auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetSignupError: (state) => {
            state.signupError = "";
        },
        resetLoginError: (state) => {
            state.loginError = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.signupError = "";
                state.isUserLoggedIn = true;
                state.userData = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = "failed";
                state.isUserLoggedIn = false;
                state.userData = null;
                state.signupError = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loginError = "";
                state.isUserLoggedIn = true;
                state.userData = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.isUserLoggedIn = false;
                state.userData = null;
                state.loginError = action.error.message;
            })
            .addCase(logout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = "succeeded";
                state.logoutError = "";
                state.userData = null;
                state.isUserLoggedIn = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "failed";
                state.logoutError = action.error.message;
            })
            .addCase(currentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                state.isUserLoggedIn = true;
                state.userData = action.payload;
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const getAuthStatus = (state) => state.auth.status;
export const getIsUserLoggedIn = (state) => state.auth.isUserLoggedIn;
export const getUserData = (state) => state.auth.userData;
export const getAuthError = (state) => state.auth.error;
export const getSignupError = (state) => state.auth.signupError;
export const getLoginError = (state) => state.auth.loginError;
export const getLogoutError = (state) => state.auth.logoutError;

export const { resetLoginError, resetSignupError } = authSlice.actions;

export default authSlice.reducer;
