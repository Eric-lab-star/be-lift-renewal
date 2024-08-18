"use client";

import { useEffect, useRef } from "react";
import Animation from "./canvasAnimation/animation";
import { useRouter } from "next/navigation";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
	  let animation: Animation
	  
	  if(canvasRef.current){
		  animation = new Animation(canvasRef.current)
		  animation.start();
	  }

	return ()=>{
		animation.terminate();
	}

  }, [canvasRef]);


	return(
		<div className="">
			<canvas id="animationCanvas" className="bg-transparent z-40 absolute top-0 left-0" ref={canvasRef}> </canvas>
		</div>
	)
}

