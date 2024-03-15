import React, { useEffect } from "react"
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6"
import {
	TbPlayerPauseFilled,
	TbPlayerPlayFilled,
	TbPlayerTrackNextFilled,
	TbPlayerTrackPrevFilled
} from "react-icons/tb"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import {
	setCurrentAudio,
	setCurrentPage,
	setDirection
} from "../../reducers/playerReducer"
import st from "./NavButtons.module.scss"

interface INavButtons {
	isPlay: boolean
	setPlay: React.Dispatch<React.SetStateAction<boolean>>
	currentAudioRef: React.MutableRefObject<HTMLAudioElement | null>
	list: React.MutableRefObject<HTMLDivElement | null>
}

const NavButtons = ({
	isPlay,
	setPlay,
	currentAudioRef,
	list,
}: INavButtons) => {
	const {
		audioList,
		currentAudio,
		audioCount,
		currentPage,
		isLoading,
		direction,
	} = useAppSelector(state => state.playerReducer)
	const dispatch = useAppDispatch()

	const play = () => {
		setPlay(true)
		currentAudioRef.current?.play()
	}
	const pause = () => {
		setPlay(false)
		currentAudioRef.current?.pause()
	}

	const rewind = () => {
		if (currentAudioRef.current) {
			currentAudioRef.current.currentTime =
				currentAudioRef.current.currentTime - 10
		}
	}
	const fastForward = () => {
		if (currentAudioRef.current) {
			currentAudioRef.current.currentTime =
				currentAudioRef.current.currentTime + 10
		}
	}

	useEffect(() => {
		if (audioList.length && list.current?.children[8] && direction === "prev") {
			const htmlAudio = list.current?.children[8]
				.children as HTMLCollectionOf<HTMLAudioElement>

			const audioFind = audioList.find(f => f.id.toString() === htmlAudio[0].id)
			const audio = audioFind ? audioFind : null

			dispatch(setCurrentAudio(audio))
		}
		if (audioList.length && list.current?.children[0] && direction === "next") {
			const htmlAudio = list.current?.children[0]
				.children as HTMLCollectionOf<HTMLAudioElement>

			const audioFind = audioList.find(f => f.id.toString() === htmlAudio[0].id)
			const audio = audioFind ? audioFind : null

			dispatch(setCurrentAudio(audio))
		}
	}, [currentPage, list.current?.children])

	const prevTrack = () => {
		if (currentAudio) {
			dispatch(setDirection("prev"))
			if (audioList.indexOf(currentAudio!) === 0) {
				if (currentPage > 1) {
					dispatch(setCurrentPage(currentPage - 1))
				}
			} else {
				currentAudioRef.current?.pause()
				const htmlAudio = currentAudioRef.current?.parentElement
					?.previousElementSibling
					?.children as HTMLCollectionOf<HTMLAudioElement>
				const audioFind = audioList.find(
					f => f.id.toString() === htmlAudio[0].id
				)
				const audio = audioFind ? audioFind : null
				dispatch(setCurrentAudio(audio))
			}
		}
	}

	const nextTrack = () => {
		if (currentAudio) {
			dispatch(setDirection("next"))
			if (audioList.indexOf(currentAudio!) === 8) {
				if (currentPage < Math.ceil(audioCount / 9)) {
					dispatch(setCurrentPage(currentPage + 1))
				}
			} else {
				if (audioList[audioList.length - 1].id !== currentAudio.id) {
					currentAudioRef.current?.pause()
					const htmlAudio = currentAudioRef.current?.parentElement
						?.nextElementSibling?.children as HTMLCollectionOf<HTMLAudioElement>
					const audioFind = audioList.find(
						f => f.id.toString() === htmlAudio[0].id
					)
					const audio = audioFind ? audioFind : null
					dispatch(setCurrentAudio(audio))
				}
			}
		}
	}

	return (
		<div className={st.buttons}>
			<button title="Prev track" onClick={prevTrack} className={st.prev}>
				<FaBackwardStep />
			</button>
			<button title="Rewind 10 seconds" onClick={rewind} className={st.rewind}>
				<TbPlayerTrackPrevFilled />
			</button>
			{isPlay ? (
				<button title="Pause" className={st.pause} onClick={pause}>
					<TbPlayerPauseFilled />
				</button>
			) : (
				<button title="Play" className={st.play} onClick={play}>
					<TbPlayerPlayFilled />
				</button>
			)}
			<button
				title="Fast forward 10 seconds"
				className={st.forward}
				onClick={fastForward}
			>
				<TbPlayerTrackNextFilled />
			</button>
			<button onClick={nextTrack} title="Next track" className={st.next}>
				<FaForwardStep />
			</button>
		</div>
	)
}

export default NavButtons
