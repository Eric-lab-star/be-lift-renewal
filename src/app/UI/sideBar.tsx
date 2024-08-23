import clsx from "clsx"
import { darkText } from "../styles"
import AuditionIcon from "../SVG/auditionIcon"
import EnhypenLogo from "../SVG/enhypenLogo"
import IllitLogo from "../SVG/illitLogo"
import Question from "../SVG/question"
import Link from "next/link"
import { useContext } from "react"
import { SideBarCtx, SideBarDispatchCtx } from "../stateManager/sideBarManager"
import { animated, useSpring } from "@react-spring/web"

const navLinkStyle = "font-semibold flex justify-center items-center gap-2 p-2 hover:bg-amber-500 hover:text-white "
const links = [
	{label: "ilit", path: "/illit", key:"illit", desc: "illit icon", jsx: <IllitLogo/> },
	{label: "enhypen", path: "/enhypen", key:"enhypen",  desc: "enhypen icon" , jsx: <EnhypenLogo/> },
	{label: "audition", path: "/audition", key:"audition", desc: "audition icon", jsx: <AuditionIcon/> },
	{label: "about", path: "/about", key:"about", desc: "about icon", jsx: <Question/> },
]


export default function SideBar(){
	const sideBarState = useContext(SideBarCtx)
	const setSideBar = useContext(SideBarDispatchCtx)
	const style = useSpring({
		from:{
			transform: sideBarState ? "translateX(-100%)" : "translateX(0)"
		},
		to:{
			transform: sideBarState ? "translateX(0)" : "translateX(-100%)"
		}
	})

	function closeSideBar(){
		if(setSideBar === null) {
			throw new Error("seSideBar is null")
		}
		setSideBar(false)
	}

	return(
		<>
		{ sideBarState && <animated.div key={2}  id="closeable" onClick={()=>closeSideBar()} className="md:-z-10  bg-slate-400/70 backdrop-blur-md w-screen h-screen fixed top-10 md:w-fit md:min-h-screen md:static">
					<div id="Links" className={ clsx(`sm:bg-pink-400 dark:bg-amber-700/30 text-sm dark:${darkText} flex flex-col border-b-gray-300 dark:border-amber-600/10 border w-40  h-screen md:min-h-screen bg-white/90  backdrop-blur-md`, )} >
						{links.map((link)=>{
							return (
								<Link key={link.key} className={clsx(navLinkStyle)} href={link.path}>
									{link.jsx}
									<div>{link.label.toUpperCase()}</div>
								</Link>
							)
						})}
					</div>
				</animated.div>
		}
		</>
	)
}
