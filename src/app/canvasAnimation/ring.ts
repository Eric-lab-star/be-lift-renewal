import { Bodies, Body, Composite, Vector } from "matter-js";
import { draggable } from "./bodies";

export default class Ring {
	private static OFFSET: number = 120
	private static RADIAN: number = Math.PI / 180
	private static step: number = 30
	private static centerPos: Matter.Vector = {x: 0, y: 0}

	private static basePoint: Matter.Vector[] = Ring.initBasePoint()

	public bodies: Matter.Body[]
	public compo: Composite

	constructor(){
		this.compo = Composite.create({label: "ring"})
		this.bodies = this.initRingBodies()
		Composite.add(this.compo, this.bodies)
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

	private initRingBodies(){
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
		}
		return tmp
	}

	public setRingsCenter(newPos: Vector){
		if(newPos.x === Ring.centerPos.x && newPos.y === Ring.centerPos.y) return;
		Ring.centerPos = newPos
		this.bodies.forEach((body,i) =>{
			Body.setPosition(body, Vector.add(newPos, Ring.basePoint[i]))
		})
	}


	private animationSpeed: number  = 100
	public whirlwind(){
		const STEP = 20;
		const LIMIT = 200;
		this.bodies.forEach(body => {
			let id: number;
			id = window.setInterval(()=>{
				const hypot = 
					Math.hypot(
						body.position.x - Ring.centerPos.x,
						body.position.y - Ring.centerPos.y
					)
				if(hypot > LIMIT){
					Body.setVelocity(body,{x: 0, y:0})
					clearInterval(id)
				}
				const radian = 
					Math.atan2(
						body.position.y - Ring.centerPos.y,
						body.position.x - Ring.centerPos.x
					) + STEP
				const velocity = {x : Math.cos(radian), y: Math.sin(radian)}
				Body.setVelocity(body, velocity)
			},this.animationSpeed)
			
		})

	}



}
