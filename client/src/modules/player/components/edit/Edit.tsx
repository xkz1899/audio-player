import { SetStateAction, useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { validImageType } from "../../../../utils/validType"
import { IListAudio } from "../../models/IListAudio"
import { setCurrentAudio } from "../../reducers/playerReducer"
import { deleteAudio, editAudio } from "../../services/playerService"
import UploadFile from "../UI/uploadFile/UploadFile"
import st from "./Edit.module.scss"

interface IEdit {
	audio: IListAudio | null
	sort: string
	setEditVisible: React.Dispatch<SetStateAction<boolean>>
}

const Edit = ({ audio, sort, setEditVisible }: IEdit) => {
	const [name, setName] = useState("")
	const [genre, setGenre] = useState("")
	const [genres, setGenres] = useState<string[]>([])
	const [exclude, setExclude] = useState<string[]>([])
	const [image, setImage] = useState<FileList | null>(null)
	const [isValidError, setValidError] = useState(false)

	const dispatch = useAppDispatch()
	const { currentUser } = useAppSelector(state => state.authReducer)

	const addGenre = () => {
		if (genre.length >= 2) {
			setGenres([...genres, genre])
			setGenre("")
		}
	}

	const removeGenre = (item: string) => {
		const result = genres.filter(f => f !== item)
		setGenres(result)
		setExclude([...exclude, item])
	}

	const saveResult = () => {
		if (!isValidError) {
			if (audio) {
				if (image) {
					dispatch(editAudio(sort, audio, name, genres, exclude, image[0]))
				} else {
					dispatch(editAudio(sort, audio, name, genres, exclude))
				}
			}
			setEditVisible(false)
			dispatch(setCurrentAudio(null))
		}
	}

	const removeAudio = () => {
		if (audio) {
			dispatch(setCurrentAudio(null))
			dispatch(deleteAudio(sort, audio.id))
		}
		setEditVisible(false)
	}

	useEffect(() => {
		const arr: string[] = []
		if (audio) {
			setName(audio.name)
			audio.genres.forEach(item => {
				arr.push(item.name)
			})
		}
		setGenres(arr)
		setImage(null)
	}, [audio])

	useEffect(() => {
		if (image) {
			if (validImageType(image[0].name)) {
				setValidError(false)
			} else {
				setValidError(true)
			}
		}
	}, [image])

	return (
		<div className={st.upload}>
			<h2 className={st.title}>Edit track</h2>
			<p className={st.sub__title}>Name track:</p>
			<input
				type="text"
				className={st.name}
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<p className={st.sub__title}>Select album cover:</p>
			{image && isValidError && <p className={st.err__type}>Type error.</p>}
			<div className={st.image}>
				{audio?.img ? (
					<img
						className={st.img}
						src={`${process.env.REACT_APP_API_URL}${currentUser?.id}/img/${audio?.img}`}
						alt={audio?.name}
					/>
				) : (
					<img className={st.img} src="images/default.webp" alt="" />
				)}
				<UploadFile
					id="image-edit"
					title="Select image"
					file={image}
					setFile={setImage}
				/>
			</div>
			<p className={st.sub__title}>Add genre:</p>
			<div className={st.genre}>
				<input
					type="text"
					placeholder="Enter genre..."
					value={genre}
					onChange={e => setGenre(e.target.value)}
				/>
				<button className={st.add__genre} onClick={addGenre}>
					Add
				</button>
			</div>
			<div className={st.genre__items}>
				{genres.map(item => (
					<div key={item} className={st.genre__item}>
						<p>{item}</p>
						<button
							tabIndex={-1}
							onClick={() => removeGenre(item)}
							title="Remove"
						>
							{<IoMdClose />}
						</button>
					</div>
				))}
			</div>
			<button className={st.upload__btn} onClick={saveResult}>
				Save track
			</button>
			<button className={st.delete__btn} onClick={removeAudio}>
				Delete track
			</button>
		</div>
	)
}

export default Edit
