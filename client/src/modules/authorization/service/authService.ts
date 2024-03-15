import { $authHost, $host } from "../../../http"
import { IResponseAuth } from "../../../models/IResponseAuth"
import { AppDispatch } from "../../../store"
import {
	setAuth,
	setCurrentUser,
	setError,
	setLoading,
	setVisibleError,
} from "../reducers/authReducer"

export const registration =
	(email: string, password: string) => async (dispatch: AppDispatch) => {
		setLoading(true)
		try {
			const response = await $host.post<IResponseAuth>("/auth/registration", {
				email,
				password,
			})
			dispatch(setCurrentUser(response.data.user))
			localStorage.setItem("accessToken", response.data.accessToken)
			dispatch(setAuth(true))
			dispatch(setError(null))
		} catch (err: any) {
			dispatch(setError(err.response.data.message))
			dispatch(setVisibleError(true))
		} finally {
			setLoading(false)
		}
	}

export const login =
	(email: string, password: string) => async (dispatch: AppDispatch) => {
		setLoading(true)
		try {
			const response = await $host.post<IResponseAuth>("/auth/login", {
				email,
				password,
			})
			dispatch(setCurrentUser(response.data.user))
			localStorage.setItem("accessToken", response.data.accessToken)
			dispatch(setAuth(true))
			dispatch(setError(null))
		} catch (err: any) {
			dispatch(setError(err.response.data.message))
			dispatch(setVisibleError(true))
		} finally {
			setLoading(false)
		}
	}

export const logout = () => async (dispatch: AppDispatch) => {
	try {
		await $host.post("/auth/logout")
		dispatch(setCurrentUser(null))
		localStorage.removeItem("accessToken")
		dispatch(setAuth(false))
	} catch (err: any) {
		dispatch(setError(err.response.data.message))
	}
}

export const refresh = () => async (dispatch: AppDispatch) => {
	setLoading(true)
	try {
		const response = await $authHost.post<IResponseAuth>("/auth/refresh")
		dispatch(setCurrentUser(response.data.user))
		localStorage.setItem("accessToken", response.data.accessToken)
		dispatch(setAuth(true))
	} catch (err: any) {
		dispatch(setError(err.response.data.message))
		dispatch(setVisibleError(true))
	} finally {
		setLoading(false)
	}
}
