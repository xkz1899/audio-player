import { useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { useAppDispatch } from "../../../../hooks/redux"
import { logout } from "../../service/authService"

import st from "./Menu.module.scss"

const Menu = () => {
	const [isVisible, setVisible] = useState(false)
	const dispatch = useAppDispatch()

	return (
		<div className={st.menu} onMouseLeave={() => setVisible(false)}>
			<button className={st.burger} onClick={() => setVisible(true)}>
				<GiHamburgerMenu />
			</button>
			<button
				onClick={() => dispatch(logout())}
				className={`${st.leave} ${isVisible && st.active}`}
			>
				Leave
			</button>
		</div>
	)
}

export default Menu
