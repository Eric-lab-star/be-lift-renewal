import AuditionIcon from "../SVG/auditionIcon"
import EnhypenLogo from "../SVG/enhypenLogo"
import IllitLogo from "../SVG/illitLogo"
import Question from "../SVG/question"
import { useContext } from "react"
import { BodyMeasureCtx } from "../../stateManager/bodyMeasure"
import SmallScreenSideBar from "./smallScreenSideBar"
import LargeScreenSideBar from "./largeScreenSideBar"
import AuditionIconMini from "../SVG/auditionIconMini"
import InfoIconMini from "../SVG/infoIconMini"
import IllitLogoSmall from "../logos/illit_logo_small"
import EnhypenLogoSmall from "../logos/enhypen_logo_small"

export const navLinkStyle = "font-semibold flex justify-center items-center h-14 p-2 space-x-2 rounded-lg hover:bg-slate-200 "
export const links = [
	{label: "ilit", path: "/illit", key:"illit", jsx: <IllitLogo/>, jsx_mini: <IllitLogoSmall/> },
	{label: "enhypen", path: "/enhypen", key:"enhypen",   jsx: <EnhypenLogo/>, jsx_mini: <EnhypenLogoSmall/> },
	{label: "audition", path: "/audition", key:"audition",  jsx: <AuditionIcon/>, jsx_mini: <AuditionIconMini/> },
	{label: "about", path: "/about", key:"about", jsx: <Question/>, jsx_mini: <InfoIconMini/> },
]


export default function SideBar(){
	const bodyMeasureState = useContext(BodyMeasureCtx)
	if(!bodyMeasureState) throw new Error("BodyMeasureCtx is null")
	
	switch (true){
		case bodyMeasureState.width >= 768:
			return <LargeScreenSideBar/>
		case bodyMeasureState.width < 768:
			return <SmallScreenSideBar/>
	}
}






