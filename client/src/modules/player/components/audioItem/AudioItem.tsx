import { useEffect, useRef, useState } from "react"
import { MdModeEdit } from "react-icons/md"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { formatSecondToTime } from "../../../../utils/formatSecondToTime"
import { removeType } from "../../../../utils/removeType"
import { IListAudio } from "../../models/IListAudio"
import {
	setCurrentAudio,
	setDirection,
	setDuration as setMainDuration,
} from "../../reducers/playerReducer"
import st from "./AudioItems.module.scss"

interface IAudioItem {
	audio: IListAudio
	currentAudioRef: React.MutableRefObject<HTMLAudioElement | null>
	setPlay: React.Dispatch<React.SetStateAction<boolean>>
	setEditVisible: React.Dispatch<React.SetStateAction<boolean>>
	setEditAudio: React.Dispatch<React.SetStateAction<IListAudio | null>>
	setProcessTime: React.Dispatch<React.SetStateAction<number>>
}

const AudioItem = ({
	audio,
	currentAudioRef,
	setPlay,
	setEditAudio,
	setEditVisible,
	setProcessTime,
}: IAudioItem) => {
	const [duration, setDuration] = useState<number | undefined>(0)
	const [isLoading, setLoading] = useState(false)
	const [style, setStyle] = useState([st.audio])

	const dispatch = useAppDispatch()
	const { currentAudio, direction } = useAppSelector(
		state => state.playerReducer
	)
	const { currentUser } = useAppSelector(state => state.authReducer)

	const audioRef = useRef<HTMLAudioElement | null>(null)
	const btn = useRef<HTMLButtonElement | null>(null)

	const name = removeType(audio.name)

	const start = () => {
		dispatch(setCurrentAudio(audio))
		audioRef.current?.play()
		setPlay(true)
	}

	const combineRef = (item: HTMLAudioElement | null) => {
		audioRef.current = item
		if (audio.id === currentAudio?.id) currentAudioRef.current = item
	}

	const timeUpdate = () => {
		audioRef.current && setProcessTime(audioRef.current.currentTime)
	}

	const enableEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		setEditVisible(true)
		setEditAudio(audio)
	}

	useEffect(() => {
		if (isLoading && audioRef.current) {
			setDuration(audioRef.current!.duration)
		}
	}, [isLoading])

	useEffect(() => {
		if (audio.id !== currentAudio?.id) {
			audioRef.current?.pause()
		}
	}, [currentAudio])

	useEffect(() => {
		if (audio.id === currentAudio?.id) {
			setStyle([...style, st.audio__active])
		} else {
			setStyle([st.audio])
		}
	}, [currentAudio])

	useEffect(() => {
		if (currentAudio && currentAudio.id === audio.id) {
			if (direction) {
				btn.current?.click()
			}
			if (isLoading && audioRef.current) {
				dispatch(setMainDuration(audioRef.current?.duration))
			}
			dispatch(setDirection(null))
		}
	}, [currentAudio, isLoading])

	return (
		<>
			<button
				ref={btn}
				onClick={start}
				className={style.join(" ")}
				title={name}
			>
				<audio
					id={audio.id.toString()}
					onLoadedMetadata={() => setLoading(true)}
					onTimeUpdate={timeUpdate}
					onEnded={() => setPlay(false)}
					ref={combineRef}
					src={`${process.env.REACT_APP_API_URL}${currentUser?.id}/${audio.name}`}
				></audio>
				<div className={st.wrap}>
					{audio.img ? (
						<img
							src={`${process.env.REACT_APP_API_URL}${currentUser?.id}/img/${audio.img}`}
							alt={audio.name}
						/>
					) : (
						<img src="images/default.webp" alt={audio.name} />
					)}
					{name.slice(0, 30)}
					{name.length > 30 && "..."}
				</div>

				<p className={st.genre}>
					{audio.genres.map((genre, i) => (
						<span key={genre.id}>
							{genre.name}
							{audio.genres?.length - 1 !== i && ", "}
						</span>
					))}
				</p>
				<p>{formatSecondToTime(Number(duration))}</p>
				<button onClick={enableEdit} className={st.edit}>
					<MdModeEdit />
				</button>
			</button>
		</>
	)
}

export default AudioItem
