"use client"
import { useSpring, animated } from "@react-spring/web"
import { useState } from "react"


export default function Home() {
	const [styles, api] = useSpring(()=>({x:0}))
	const [toggle, setToggle] = useState(false)
	function handleClick() {
		if(!toggle){
			api.start({x: 100})
			setToggle(true)
		}else{
			api.start({x:0})
			setToggle(false)
		}
	}


  return (
		<animated.div
			onClick={handleClick}
		  style={{
			width: 80,
			height: 80,
			borderRadius: 8,
			backgroundColor: "blue",
			...styles
		  }}
		/>
	)
}

