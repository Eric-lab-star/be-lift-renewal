import { useContext } from "react"
import { ThemeCtx, ThemeDispatchCtx } from "../stateManager/themeManager"
import Dark from "./SVG/dark"
import Light from "./SVG/light"

export default function ThemeToggleUI(){
	const dispatchTheme = useContext(ThemeDispatchCtx)
	const theme = useContext(ThemeCtx)
	function toggleTheme(){
		if (dispatchTheme === null || theme === null) return
		if(theme.state === "dark"){
			dispatchTheme({state:"light"})
			window.localStorage.setItem("theme", "light")
		}else{
			dispatchTheme({state: "dark"})
			window.localStorage.setItem("theme", "dark")
		}
	}

	return(
		<div className="pr-2 flex justify-center items-center scale-125 cursor-pointer" onClick={toggleTheme}>
			{theme?.state === "dark" ? <Dark/> : <Light/> }
		</div>
	)
}
