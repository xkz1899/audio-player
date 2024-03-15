import { useEffect, useRef, useState } from "react"

import Container from "../../components/container/Container"
import Loader from "../../components/loader/Loader"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import Modal from "./../../components/modal/Modal"
import AudioItem from "./components/audioItem/AudioItem"
import CreateAudio from "./components/createAudio/CreateAudio"
import Edit from "./components/edit/Edit"
import NavPlayer from "./components/navPlayer/NavPlayer"
import Pagination from "./components/pagination/Pagination"
import Search from "./components/UI/search/Search"
import Sort from "./components/UI/sort/Sort"
import UploadButton from "./components/UI/uploadButton/UploadButton"
import { IListAudio } from "./models/IListAudio"
import st from "./Player.module.scss"
import { getAudioList, searchAudio } from "./services/playerService"

const Player = () => {
	const [isPlay, setPlay] = useState(false)
	const [processTime, setProcessTime] = useState(0)
	const [createVisible, setCreateVisible] = useState(false)
	const [editVisible, setEditVisible] = useState(false)
	const [search, setSearch] = useState("")
	const [currentSort, setCurrentSort] = useState("createdAt:DESC")
	const [editAudio, setEditAudio] = useState<IListAudio | null>(null)

	const currentAudioRef = useRef<HTMLAudioElement | null>(null)
	const list = useRef<HTMLDivElement | null>(null)

	const dispatch = useAppDispatch()
	const { audioList, audioCount, isLoading, limit, currentPage } =
		useAppSelector(state => state.playerReducer)

	useEffect(() => {
		if (currentAudioRef.current) {
			setPlay(!currentAudioRef.current.paused)
		}
	}, [currentAudioRef.current?.paused])

	useEffect(() => {
		if (search.length) {
			dispatch(searchAudio(search, limit, currentPage, currentSort))
		}
		dispatch(getAudioList(currentSort, limit, currentPage))
	}, [currentPage, search, currentSort])

	return (
		<div>
			<Container>
				<Modal visible={createVisible} setVisible={setCreateVisible}>
					<CreateAudio setCreateVisible={setCreateVisible} sort={currentSort} />
				</Modal>
				<Modal visible={editVisible} setVisible={setEditVisible}>
					<Edit
						audio={editAudio}
						setEditVisible={setEditVisible}
						sort={currentSort}
					/>
				</Modal>
				<div className={st.wrap}>
					<div className={st.main_area}>
						<div className={st.header}>
							<UploadButton setCreateVisible={setCreateVisible} />
							<Sort setCurrentSort={setCurrentSort} />
							<Search setSearch={setSearch} />
						</div>
						<NavPlayer
							setPlay={setPlay}
							isPlay={isPlay}
							currentAudioRef={currentAudioRef}
							processTime={processTime}
							list={list}
						/>
						<p className={st.quantity}>Quantity: {audioCount}</p>
						{!isLoading ? (
							<div ref={list} className={st.list}>
								{audioList.map(audio => (
									<AudioItem
										key={audio.id}
										audio={audio}
										setPlay={setPlay}
										setEditAudio={setEditAudio}
										setEditVisible={setEditVisible}
										currentAudioRef={currentAudioRef}
										setProcessTime={setProcessTime}
									/>
								))}
							</div>
						) : (
							<Loader />
						)}
						{audioCount > limit && <Pagination />}
					</div>
				</div>
			</Container>
		</div>
	)
}

export default Player
