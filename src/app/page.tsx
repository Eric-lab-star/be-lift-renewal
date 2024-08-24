"use client"
import { useSpring, animated, useTransition, AnimatedProps } from "@react-spring/web"
import { CSSProperties, useState} from "react"


export default function Home() {
	const [styles, api] = useSpring(()=>({x:0}))
	const [toggle, setToggle] = useState(false)
	const transition = useTransition(toggle, {
		keys: null,
		from: {
			transform: "translate3d(100%, 0, 0)",
			opacity: 0,
		},
		enter:{
			transform: "translate3d(0%, 0, 0)",
			opacity: 1,
			
		},
		leave:{
			transform: "translate3d(-100%, 0, 0)",
			opacity: 0,
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
			transition((transitionStyle, toggle)=>{
				return <div className="relative">{toggle ? <BoxA style={transitionStyle}/> : <BoxB style={transitionStyle} />}</div>
				
			})
		}
	</div>
	)
}



function BoxA({style}: AnimatedProps<{style: CSSProperties}>){
return <animated.div className="bg-amber-500 w-40 h-40 text-lg font-semibold" style={style}>A</animated.div>
}
function BoxB({style}: AnimatedProps<{style: CSSProperties}>){
	return <animated.div className="bg-amber-500 w-40 h-40 text-lg font-semibold" style={style}>B</animated.div>
}
function BoxC({style}: {style: CSSProperties}){
	return <animated.div className="bg-amber-500 w-40 h-40 text-lg font-semibold" style={style}>C</animated.div>
}
