import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { setCurrentPage } from "../../reducers/playerReducer"
import st from "./Pagination.module.scss"

const Pagination = () => {
	const page: Array<number> = []

	const { currentPage, audioCount, limit } = useAppSelector(
		state => state.playerReducer
	)
	const dispatch = useAppDispatch()

	for (let i = 0; i < Math.ceil(audioCount / limit); i++) {
		page.push(i + 1)
	}

	const renderPagination = () => {
		return page.map(i => {
			if (
				i === currentPage - 1 ||
				i === currentPage - 2 ||
				i === currentPage ||
				i === currentPage + 1 ||
				i === currentPage + 2
			) {
				return (
					<button
						key={i}
						onClick={() => dispatch(setCurrentPage(i))}
						className={`${st.btn} ${i === currentPage ? st.active : ""}`}
					>
						{i}
					</button>
				)
			}
		})
	}

	return audioCount > 0 ? (
		<div className={st.wrap}>
			{currentPage >= 4 && (
				<>
					<button
						className={st.btn}
						onClick={() => dispatch(setCurrentPage(1))}
					>
						1
					</button>
					<p className={st.dot}>...</p>
				</>
			)}
			{renderPagination()}
			{currentPage <= page[page.length - 1] - 3 && (
				<>
					<p className={st.dot}>...</p>
					<button
						onClick={() => dispatch(setCurrentPage(page[page.length - 1]))}
						className={st.btn}
					>
						{page[page.length - 1]}
					</button>
				</>
			)}
		</div>
	) : (
		<></>
	)
}

export default Pagination
