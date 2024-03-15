import { IListAudio } from "../models/IListAudio"

export interface PlayerState {
	audioList: IListAudio[]
	audio: IListAudio | null
	currentAudio: IListAudio | null
	audioCount: number
	duration: number
	limit: number
	direction: string | null
	currentPage: number
	isLoading: boolean
}
