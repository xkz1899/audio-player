import { IUser } from "./IUser"

export interface IResponseAuth {
	accessToken: string
	refreshToken: string
	user: IUser
}
