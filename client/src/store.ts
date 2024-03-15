import { configureStore } from "@reduxjs/toolkit"

import { authReducer } from "./modules/authorization"
import { playerReducer } from "./modules/player"

export const store = configureStore({
	reducer: {
		authReducer,
		playerReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
