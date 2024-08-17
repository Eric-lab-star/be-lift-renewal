"use client";
import { useEffect, useRef } from "react";
import Animation from "./canvasAnimation/animation";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const router = useRouter();



  useEffect(() => {
	  let animation: Animation
	  
	  if(canvasRef.current && textRef.current){
		  animation = new Animation(canvasRef.current, textRef.current)
		  animation.start();
		  animation.connectEvent();
	  }

	return ()=>{
		animation.terminate();
	}

  }, [canvasRef]);

  useEffect(()=>{
	  if(textRef.current ){
		  textRef.current.addEventListener("illit", ()=>{
			  router.push("/illit")
		  })
	  }
  },[textRef])

	return( 
		<>
			<canvas id="animationCanvas"  className="bg-transparent z-40 absolute top-0 left-0" ref={canvasRef}>
			</canvas>
			<div id="button" className="bg-pink-500 w-[100px] h-[100px]" ref={textRef}>
				<Link href="/illit">goto illit</Link>
			</div>
		</>
	)
}

