"use client"
import { useSpring, animated, useTransition } from "@react-spring/web"
import { useState} from "react"


export default function Home() {
	const [styles, api] = useSpring(()=>({x:0}))
	const [toggle, setToggle] = useState(false)
	const transition = useTransition(toggle, {
		from: {
			x: 0,
			opacity: 0
		},
		enter:{
			x: 100,
			opacity: 1
			
		},
		leave:{
			x:0,
			opacity: 0
		}
	})

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
	<div className="container border-amber-500 border-2 border-dashed mx-auto">
		<button className="rounded-md bg-amber-500 p-2" onClick={()=>handleClick()}>click me!</button>
		{
			transition((transitionStyle, toggle)=>(
				<>
				{
					toggle ? <animated.div className="w-20 h-20 bg-amber-500" style={transitionStyle}></animated.div> : null
				}
				</>
			))
		}
	</div>
	)
}

