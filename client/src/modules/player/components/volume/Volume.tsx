import { useState, useEffect } from "react"
import {
	FaVolumeXmark,
	FaVolumeOff,
	FaVolumeLow,
	FaVolumeHigh,
} from "react-icons/fa6"
import { useAppSelector } from "../../../../hooks/redux"

import st from "./Volume.module.scss"

interface IValue {
	currentAudioRef: React.MutableRefObject<HTMLAudioElement | null>
}

const Volume = ({ currentAudioRef }: IValue) => {
	const [volume, setVolume] = useState(100)
	const [tempVolume, setTempVolume] = useState(100)
	const { currentAudio } = useAppSelector(state => state.playerReducer)

	const switchOnOrOfVolume = () => {
		if (currentAudioRef.current) {
			if (currentAudioRef.current.volume > 0) {
				setTempVolume(volume)
				setVolume(0)
			} else {
				setVolume(tempVolume)
			}
		}
	}

	useEffect(() => {
		if (currentAudioRef.current) currentAudioRef.current.volume = volume / 100
	}, [volume, currentAudio])

	const viewIcon = () => {
		if (volume === 0) {
			return <FaVolumeXmark />
		} else if (volume > 0 && volume <= 33) {
			return <FaVolumeOff />
		} else if (volume > 33 && volume <= 66) {
			return <FaVolumeLow />
		} else if (volume > 66 && volume <= 100) {
			return <FaVolumeHigh />
		}
	}

	return (
		<div
			title={volume === 0 ? "Switch on volume" : "Switch of volume"}
			className={st.volume}
		>
			<button onClick={switchOnOrOfVolume} className={st.volume__icon}>
				{viewIcon()}
			</button>
			<div className={st.wrap}>
				<div
					style={{ width: volume + "%" }}
					className={st.volume__progress}
				></div>
				<input
					title={volume.toString()}
					type="range"
					min="0"
					max="100"
					step="1"
					value={volume}
					className={st.volume}
					onChange={e => setVolume(Number(e.target.value))}
				/>
			</div>
		</div>
	)
}

export default Volume
