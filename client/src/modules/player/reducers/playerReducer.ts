import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IListAudio } from "../models/IListAudio"
import { PlayerState } from "./type"

const initialState: PlayerState = {
	audioList: [],
	audio: null,
	currentAudio: null,
	audioCount: 0,
	duration: 0,
	currentPage: 1,
	limit: 9,
	direction: null,
	isLoading: false,
}

const playerReducer = createSlice({
	name: "player",
	initialState,
	reducers: {
		setAudioList(state, action: PayloadAction<IListAudio[]>) {
			state.audioList = action.payload
		},
		setAudioCount(state, action: PayloadAction<number>) {
			state.audioCount = action.payload
		},
		setCurrentAudio(state, action: PayloadAction<IListAudio | null>) {
			state.currentAudio = action.payload
		},
		setAudio(state, action: PayloadAction<IListAudio>) {
			state.audio = action.payload
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setDuration(state, action: PayloadAction<number>) {
			state.duration = action.payload
		},
		setDirection(state, action: PayloadAction<string | null>) {
			state.direction = action.payload
		},
	},
})

export default playerReducer.reducer
export const {
	setAudioList,
	setAudioCount,
	setCurrentAudio,
	setAudio,
	setCurrentPage,
	setLoading,
	setDirection,
	setDuration,
} = playerReducer.actions
