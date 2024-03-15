import React, { SetStateAction, useEffect, useRef, useState } from "react"
import { IoSearch } from "react-icons/io5"

import { useDelay } from "../../../../../hooks/delay"
import { useAppDispatch } from "../../../../../hooks/redux"
import { setCurrentAudio } from "../../../reducers/playerReducer"
import st from "./Search.module.scss"

interface ISearch {
	setSearch: React.Dispatch<SetStateAction<string>>
}

const Search = ({ setSearch }: ISearch) => {
	const [searchValue, setSearchValue] = useState("")
	const [isVisible, setVisible] = useState(false)
	const input = useRef<HTMLInputElement | null>(null)

	const dispatch = useAppDispatch()

	const value = useDelay(searchValue)

	useEffect(() => {
		setSearch(value)
		dispatch(setCurrentAudio(null))
	}, [value])

	useEffect(() => {
		input.current?.focus()
	}, [isVisible])

	return (
		<div className={`${st.search} ${isVisible && st.active}`}>
			<button
				title="Search"
				onClick={() => setVisible(true)}
				className={st.search__btn}
			>
				<IoSearch />
			</button>
			<input
				ref={input}
				onBlur={() => !searchValue.length && setVisible(false)}
				className={st.search__input}
				placeholder="Search audio..."
				type="text"
				value={searchValue}
				onChange={e => setSearchValue(e.target.value)}
			/>
		</div>
	)
}

export default Search
