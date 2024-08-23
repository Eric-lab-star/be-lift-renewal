"use client"
import { createContext, Dispatch } from "react"

export const SideBarCtx = createContext<boolean | null>(null)
export const SideBarDispatchCtx = createContext<Dispatch<boolean> | null>(null)

export function sideBarReducer(state:boolean, action: boolean){
	return action
}
