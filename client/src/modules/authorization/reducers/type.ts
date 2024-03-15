import { IUser } from "../../../models/IUser"

export interface AuthState {
	isAuth: boolean
	currentUser: IUser | null
	isLoading: boolean
	error: string | null
	isVisibleError: boolean
}
