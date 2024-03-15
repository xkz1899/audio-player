import { useState, useRef, useEffect } from "react"
import { BiSortUp } from "react-icons/bi"
import { useAppDispatch } from "../../../../../hooks/redux"
import { setCurrentAudio } from "../../../reducers/playerReducer"

import st from "./Sort.module.scss"

interface ISort {
	setCurrentSort: React.Dispatch<React.SetStateAction<string>>
}

const Sort = ({ setCurrentSort }: ISort) => {
	const order = [
		{ value: `createdAt:DESC`, name: `By date (new ones first)` },
		{ value: `createdAt:ASC`, name: `By date (old ones first)` },
		{ value: `name:ASC`, name: `By name A-Z` },
		{ value: `name:DESC`, name: `By name Z-A` },
	]

	const select = useRef<HTMLSelectElement | null>(null)

	const dispatch = useAppDispatch()

	const [value, setValue] = useState("createdAt:DESC")
	const [isVisible, setVisible] = useState(false)

	const openSelect = () => {
		setVisible(true)
		if (select.current) {
			select.current.focus()
			select.current.size = order.length
		}
	}

	useEffect(() => {
		setVisible(false)
		setCurrentSort(value)
		dispatch(setCurrentAudio(null))
	}, [value])

	return (
		<div className={st.sort} onMouseLeave={() => setVisible(false)}>
			<button onClick={openSelect} title="Sort" className={st.sort__btn}>
				<BiSortUp />
			</button>
			<select
				ref={select}
				name="Order"
				id="order"
				className={`${st.sort__select} ${isVisible && st.active}`}
				value={value}
				onChange={e => setValue(e.target.value)}
			>
				{order.map(({ value, name }) => (
					<option key={value} value={value}>
						{name}
					</option>
				))}
			</select>
		</div>
	)
}

export default Sort
