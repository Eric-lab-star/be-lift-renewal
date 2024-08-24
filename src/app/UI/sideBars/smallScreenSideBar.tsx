import { SideBarCtx, SideBarDispatchCtx } from "@/app/stateManager/sideBarManager"
import clsx from "clsx"
import { useContext } from "react"
import { animated } from "@react-spring/web"
import { darkText } from "@/app/styles"
import { links, navLinkStyle } from "./sideBar"
import Link from "next/link"
import Footer from "../footer"


export default function SmallScreenSideBar(){
	const sideBarState = useContext(SideBarCtx)
	const setSideBar = useContext(SideBarDispatchCtx)
	function closeSideBar(){
		if(setSideBar === null) {
			throw new Error("seSideBar is null")
		}
		setSideBar(false)
	}

	return (
		<>
		{ sideBarState && <animated.div key={2}  id="closeable" onClick={()=>closeSideBar()} className="z-20  bg-slate-400/70 backdrop-blur-md w-screen h-screen fixed top-10">
			<div id="Links" className={ clsx(`dark:bg-amber-700/30 text-sm dark:${darkText} bg-white flex flex-col border-b-gray-300 dark:border-amber-600/10 border w-48 h-screen`, )} >
				<div className="flex-1">
					{links.map((link)=>{
						return (
							<Link key={link.key} className={clsx(navLinkStyle)} href={link.path}>
								{link.jsx}
								<div>{link.label.toUpperCase()}</div>
							</Link>
						)
					})}
				</div>
				<div className="flex-1 flex items-end pb-10">
					<Footer/>
				</div>
			</div>
		</animated.div>
		}
		</>
	)
}
