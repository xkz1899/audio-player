import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import { IListAudio } from "../models/IListAudio"
import {
	setAudioCount,
	setAudioList,
	setLoading,
} from "../reducers/playerReducer"
import { IResponseAudio } from "./../models/IResponseAudio"

export const getAudioList =
	(sort: string = "createdAt:DESC", limit: number = 9, page: number = 1) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoading(true))
			const response = await $authHost.get<IResponseAudio>(
				`/audio/?limit=${limit}&page=${page}&sort=${sort}`
			)
			dispatch(setAudioList(response.data.rows))
			dispatch(setAudioCount(response.data.count))
		} catch (err) {
		} finally {
			dispatch(setLoading(false))
		}
	}

export const searchAudio =
	(
		search: string,
		limit: number = 9,
		page: number = 1,
		sort: string = "createdAt:DESC"
	) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoading(true))
			const response = await $authHost.get<IResponseAudio>(
				`/audio/search/?search=${search}&limit=${limit}&page=${page}&sort=${sort}`
			)
			dispatch(setAudioList(response.data.rows))
			dispatch(setAudioCount(response.data.count))
		} catch (err) {
		} finally {
			dispatch(setLoading(false))
		}
	}

const addGenre = async (genres: Array<string>, audioId: number) => {
	if (genres.length) {
		for (let i = 0; i < genres.length; i++) {
			await $authHost.post<IListAudio>(`/audio/add-genre`, {
				audioId,
				name: genres[i],
			})
		}
	}
}

const removeGenre = async (exclude: Array<string>, audioId: number) => {
	if (exclude.length) {
		for (let i = 0; i < exclude.length; i++) {
			await $authHost.delete<IListAudio>(`audio/genre/${exclude[i]}/${audioId}`)
		}
	}
}

export const addNewTrack =
	(sort: string, audio: File, genres: Array<string>, image?: File) =>
	async (dispatch: AppDispatch) => {
		try {
			const formData = new FormData()
			formData.append(`audio`, audio)
			formData.append(`name`, audio.name)
			if (image) formData.append(`img`, image)
			const response = await $authHost.post<IListAudio>(
				`/audio/upload`,
				formData
			)
			await addGenre(genres, response.data.id)
			await dispatch(getAudioList(sort))
		} catch (err) {}
	}

export const editAudio =
	(
		sort: string,
		audio: IListAudio,
		name: string,
		genres: string[],
		exclude: string[],
		image?: File
	) =>
	async (dispatch: AppDispatch) => {
		try {
			const formDataImage = new FormData()
			const formDataName = new FormData()
			formDataName.append(`name`, name)
			formDataName.append(`id`, audio.id.toString())

			formDataImage.append(`id`, audio.id.toString())
			if (image) formDataImage.append(`image`, image)

			if (image)
				await $authHost.patch<IListAudio>(`/audio/image`, formDataImage)
			if (audio.name !== name)
				await $authHost.patch<IListAudio>(`/audio/name`, formDataName)

			await removeGenre(exclude, audio.id)
			await addGenre(genres, audio.id)
			await dispatch(getAudioList(sort))
		} catch (err) {}
	}

export const deleteAudio =
	(sort: string, id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete<IListAudio>(`/audio/${id}`)
			await dispatch(getAudioList(sort))
		} catch (err) {}
	}
