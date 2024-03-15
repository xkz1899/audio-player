import React, { useEffect, useState } from "react"
import { FaStop } from "react-icons/fa6"
import { TbReload } from "react-icons/tb"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { formatSecondToTime } from "../../../../utils/formatSecondToTime"
import { removeType } from "../../../../utils/removeType"
import { setDuration } from "../../reducers/playerReducer"
import NavButtons from "../navButtons/NavButtons"
import Volume from "../volume/Volume"
import st from "./NavPlayer.module.scss"

interface INavPlayer {
	isPlay: boolean
	setPlay: React.Dispatch<React.SetStateAction<boolean>>
	currentAudioRef: React.MutableRefObject<HTMLAudioElement | null>
	list: React.MutableRefObject<HTMLDivElement | null>
	processTime: number
}

const NavPlayer = ({
	isPlay,
	setPlay,
	currentAudioRef,
	processTime,
	list,
}: INavPlayer) => {
	const { currentAudio, duration } = useAppSelector(
		state => state.playerReducer
	)
	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	const style = { width: `${(processTime * 100) / duration}%` }

	const reload = () => {
		if (currentAudioRef.current) {
			currentAudioRef.current.currentTime = 0
			setPlay(true)
			currentAudioRef.current?.play()
		}
	}

	const stop = () => {
		if (currentAudioRef.current) {
			currentAudioRef.current.currentTime = 0
			setPlay(false)
			currentAudioRef.current?.pause()
		}
	}

	const renderImg = () => {
		if (currentAudio?.img) {
			return (
				<img
					src={`${process.env.REACT_APP_API_URL}${currentUser?.id}/img/${currentAudio.img}`}
					alt={currentAudio.name}
				/>
			)
		} else if (currentAudio) {
			return <img src={"images/default.webp"} alt={currentAudio?.name} />
		}
	}
	const setProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (currentAudioRef.current) {
			currentAudioRef.current.currentTime = Number(e.target.value)
		}
	}

	useEffect(() => {
		if (currentAudioRef.current && !isNaN(currentAudioRef.current.duration))
			dispatch(setDuration(currentAudioRef.current.duration))
	}, [currentAudio])

	return (
		<>
			<div className={st.title}>
				<p className={st.audio__name}>
					{currentAudio?.name && removeType(currentAudio.name)}
				</p>
			</div>
			<div className={st.nav}>
				<div className={st.img}>{renderImg()}</div>
				<NavButtons
					isPlay={isPlay}
					setPlay={setPlay}
					currentAudioRef={currentAudioRef}
					list={list}
				/>
				<div className={st.right}>
					<button title="Reload" className={st.reload} onClick={reload}>
						<TbReload />
					</button>
					<button title="Stop" className={st.stop} onClick={stop}>
						<FaStop />
					</button>
					<Volume currentAudioRef={currentAudioRef} />
				</div>
			</div>
			<div className={st.process}>
				<div className={st.line}>
					<div style={style} className={st.line__process}></div>
					<input
						type="range"
						min="0"
						step="0.1"
						max={duration}
						value={currentAudioRef.current?.currentTime || 0}
						className={st.progress}
						onChange={setProgress}
					/>
				</div>
				<div className={st.time}>
					<p>
						{currentAudioRef.current
							? formatSecondToTime(currentAudioRef.current.currentTime)
							: "00:00"}
					</p>
					<p>{formatSecondToTime(duration)}</p>
				</div>
			</div>
		</>
	)
}

export default NavPlayer
