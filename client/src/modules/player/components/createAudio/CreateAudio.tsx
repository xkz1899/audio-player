import { SetStateAction, useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"

import { validAudioType, validImageType } from "../../../../utils/validType"
import { setCurrentAudio } from "../../reducers/playerReducer"
import { addNewTrack } from "../../services/playerService"
import { useAppDispatch } from "./../../../../hooks/redux"
import UploadFile from "./../UI/uploadFile/UploadFile"
import st from "./CreateAudio.module.scss"

interface ICreateAudio {
	setCreateVisible: React.Dispatch<SetStateAction<boolean>>
	sort: string
}

const CreateAudio = ({ setCreateVisible, sort }: ICreateAudio) => {
	const [isAudioValidError, setAudioValidError] = useState(false)
	const [isImageValidError, setImageValidError] = useState(false)
	const [genres, setGenres] = useState<Array<string>>([])
	const [genre, setGenre] = useState("")
	const [audio, setAudio] = useState<FileList | null>(null)
	const [image, setImage] = useState<FileList | null>(null)

	const dispatch = useAppDispatch()

	const addGenre = () => {
		if (genre.length >= 2) {
			setGenres([...genres, genre])
			setGenre("")
		}
	}

	const removeGenre = (name: string) => {
		const arr = genres.filter(f => f !== name)
		setGenres([...arr])
	}

	const createAudio = async () => {
		if (audio && !isAudioValidError) {
			if (image && !isImageValidError) {
				await dispatch(addNewTrack(sort, audio[0], genres, image[0]))
			} else {
				await dispatch(addNewTrack(sort, audio[0], genres))
			}
			setGenres([])
			setAudio(null)
			setImage(null)
			setCreateVisible(false)
			dispatch(setCurrentAudio(null))
		}
	}

	useEffect(() => {
		if (image) {
			if (validImageType(image[0].name)) {
				setImageValidError(false)
			} else {
				setImageValidError(true)
			}
		}
		if (audio) {
			if (validAudioType(audio[0].name)) {
				setAudioValidError(false)
			} else {
				setAudioValidError(true)
			}
		}
	}, [image, audio])

	return (
		<div className={st.upload}>
			<h2 className={st.title}>Add new track</h2>
			<p className={st.sub__title}>Select new track:</p>
			{audio && isAudioValidError && (
				<p className={st.err__type}>Type error.</p>
			)}
			<UploadFile
				id="audio"
				title="Select audio"
				file={audio}
				setFile={setAudio}
			/>
			<p className={st.sub__title}>Select album cover:</p>
			{image && isImageValidError && (
				<p className={st.err__type}>Type error.</p>
			)}
			<UploadFile
				id="image"
				title="Select image"
				file={image}
				setFile={setImage}
			/>
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
			<button className={st.upload__btn} onClick={createAudio}>
				Upload track
			</button>
		</div>
	)
}

export default CreateAudio
