import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { ThemeCtx } from "../context/theme"
import { useContext, useEffect, useRef, useState } from "react"
import Dark from "../SVG/dark"
import Light from "../SVG/light"

const links = [
	{label:"be:liftlab", path: "/", key:"beliftlab", image: "/beliftlab.png", desc: "about icon" },
	{label: "about", path: "/about", key:"about", image: "/beliftlab.png", desc: "about icon" },
	{label: "ilit", path: "/illit", key:"illit", image: "/beliftlab.png", desc: "illit icon" },
	{label: "enhypen", path: "/enhypen", key:"enhypen", image: "/beliftlab.png", desc: "enhypen icon" },
	{label: "audition", path: "/audition", key:"audition", image: "/beliftlab.png", desc: "audition icon" },
]

const langs = [
	{label: "ko", key: "ko"},
	{label: "eng", key:"eng"},
	{label: "jpn", key: "jpn"},
	{label: "chn", key:"chn"},
]

const navLinkStyle = " flex justify-center items-center gap-2 p-2"

export default function NavBar({theme, toggleTheme}:{toggleTheme: ()=>void, theme: string}) {


	return(
	<div className={clsx("dark:bg-slate-600 h-20 flex border-b-gray-300 border-2")} >
		<div className="flex-1 flex items-stretch">
			{links.map((link)=>{
				return (
					<Link key={link.key} className={clsx(navLinkStyle)} href={link.path}>
						<Image 
							className="w-auto h-auto"
							height="40"
							width="40"
							priority={true}
							src={link.image}
							alt={link.desc}
						/>
						<div>{link.label.toUpperCase()}</div>
					</Link>
				)
			})}
		</div>
		<div className="flex-1 flex justify-end items-stretch gap-2 pr-2">
			{langs.map((lang)=>{
				return <div key={lang.key} className="text-xs flex justify-center items-center">
						<div>{lang.label.toUpperCase()}</div>
					</div>
			})}
			<div className="flex justify-center items-center scale-125 " onClick={toggleTheme}>
			{theme === "dark" ? <Dark/> : <Light/> }
			</div>
		</div>
	</div>
	)
}
