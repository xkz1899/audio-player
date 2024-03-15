import { useState } from "react"
import { IoCloseSharp } from "react-icons/io5"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import st from "./Authorization.module.scss"
import { setVisibleError } from "./reducers/authReducer"
import { login, registration } from "./service/authService"

const Authorization = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const dispatch = useAppDispatch()
	const { isVisibleError, error } = useAppSelector(state => state.authReducer)

	const loginHandler = () => {
		dispatch(login(email, password))
	}
	const registrationHandler = () => {
		dispatch(registration(email, password))
	}

	return (
		<div className={st.wrap}>
			{isVisibleError && (
				<div className={st.error}>
					<p>{error}</p>
					<button
						className={st.close}
						onClick={() => dispatch(setVisibleError(false))}
					>
						<IoCloseSharp />
					</button>
				</div>
			)}
			<div className={st.form}>
				<input
					type="email"
					placeholder="Enter email..."
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Enter password..."
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button onClick={loginHandler}>Login</button>
				<button onClick={registrationHandler}>Registration</button>
			</div>
		</div>
	)
}

export default Authorization
