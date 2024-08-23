
"use client"
import { createContext, Dispatch } from "react";
export const ThemeCtx = createContext<ITheme | null>(null)
export const ThemeDispatchCtx = createContext<Dispatch<ITheme> | null>(null)

export interface ITheme {
	state: string
}


export default function themesReducer(themes: ITheme, action:ITheme){
	switch (action.state){
		case "dark":
			return {state: "dark"}
		case "light":
			return {state: "light"}
		default :
			throw new Error("Unexpected action" + action.state)
	}

}

