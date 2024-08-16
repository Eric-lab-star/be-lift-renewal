"use client";
import { useEffect, useRef } from "react";
import Animation from "./canvasAnimation/animation";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
	  let animation: Animation
	  
	  if(canvasRef.current){
		  console.log("run");
		  animation = new Animation(canvasRef.current)
		  animation.start();
	  }

	
	return ()=>{
		console.log("stop");
		animation.terminate();
	}



  }, [canvasRef]);

	return( 
		<canvas id="animationCanvas" className="bg-white -z-40 absolute top-0 left-0" ref={canvasRef}></canvas>
	)
}

