import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { AuthState } from "./type"
import { IUser } from "../../../models/IUser"

const initialState: AuthState = {
	isAuth: false,
	currentUser: null,
	isLoading: false,
	error: null,
	isVisibleError: false,
}

const authReducer = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		},
		setCurrentUser(state, action: PayloadAction<IUser | null>) {
			state.currentUser = action.payload
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setVisibleError(state, action: PayloadAction<boolean>) {
			state.isVisibleError = action.payload
		},
	},
})

export default authReducer.reducer
export const {
	setAuth,
	setCurrentUser,
	setError,
	setLoading,
	setVisibleError,
} = authReducer.actions
