import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Container from "./components/container/Container"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import { Menu } from "./modules/authorization"
import { refresh } from "./modules/authorization/service/authService"
import { authRoute, IRoute, privateRoute } from "./routes"

const App = () => {
	const isAuth = useAppSelector(state => state.authReducer.isAuth)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (localStorage.getItem(`accessToken`)) {
			dispatch(refresh())
		}
	}, [])

	return (
		<Container>
			{isAuth && <Menu />}
			{isAuth ? (
				<Routes>
					{authRoute.map(({ path, Element }: IRoute) => (
						<Route key={path} path={path} element={<Element />} />
					))}
				</Routes>
			) : (
				<Routes>
					{privateRoute.map(({ path, Element }: IRoute) => (
						<Route key={path} path={path} element={<Element />} />
					))}
				</Routes>
			)}
		</Container>
	)
}

export default App
