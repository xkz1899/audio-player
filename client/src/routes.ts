import Auth from "./pages/authorization/Auth"
import Main from "./pages/main/Main"

export interface IRoute {
	path: string
	Element: React.ElementType
}

export const authRoute: IRoute[] = [{ path: "/", Element: Main }]

export const privateRoute: IRoute[] = [{ path: "/", Element: Auth }]
