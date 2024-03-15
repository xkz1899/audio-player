import { Genre } from "./Genre"

export interface IListAudio {
	id: number
	name: string
	img: string | null
	createdAt: string
	updatedAt: string
	genres: Genre[]
}
