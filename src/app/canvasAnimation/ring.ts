import { Bodies, Body, Composite, Vector } from "matter-js";
import { draggable } from "./bodies";



export default class Ring {
	private static OFFSET: number = 120
	private static RADIAN: number = Math.PI / 180
	public static compo: Composite = Composite.create({label: "rings"})
	private static step: number = 30
	private static basePoint: Matter.Vector[] = Ring.initBasePoint()
	public static ringBodies: Matter.Body[] = Ring.initRingBodies()
	private static centerPos: Matter.Vector = {x: 0, y:0}

	constructor(){
	}

	private static basePos(i: number){
		return {
			x: Math.cos(Ring.RADIAN * i) * Ring.OFFSET,
			y: Math.sin(Ring.RADIAN * i) * Ring.OFFSET,
		}
	}

	private static initBasePoint(){
		const tmp = []
		for(let i = 1; i < 360; i += Ring.step){
			const point = Ring.basePos(i)
			tmp.unshift(point)
		}
		return tmp
	}

	private static initRingBodies(){
		const tmp = []
		for (let i = 0; i < Ring.basePoint.length; i++ ){
			const newBody = Bodies.rectangle(
				Ring.basePoint[i].x, Ring.basePoint[i].y, 60, 60, {
					...draggable,
					chamfer: {
						radius: 30
					} 
				}
			)
			newBody.frictionAir = 0.05
			tmp[i] = newBody;
			Composite.add(Ring.compo, newBody)
		}
		return tmp
	}

	public static setRingsCenter(newPos: Vector){
		if(newPos.x === Ring.centerPos.x && newPos.y === Ring.centerPos.y) return;
		Ring.centerPos = newPos
		Ring.ringBodies.forEach((body,i) =>{
			Body.setPosition(body, Vector.add(newPos, Ring.basePoint[i]))
		})
	}

}
