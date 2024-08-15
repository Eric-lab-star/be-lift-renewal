import { Bodies, Composite, Vector } from "matter-js";
import { draggable } from "./bodies";



export default class Rings {
	private centerPos: Vector
	private OFFSET: number = 120
	private RADIAN: number = Math.PI / 180
	public rings: Composite = Composite.create({label: "rings"})
	private step: number = 30
	public ringsLength = 360 / this.step 


	constructor(centerPos: Vector){
		this.centerPos = centerPos
		this.initRings()
	}

	private initRings(){
		for (let i = 1; i < 360; i += this.step){
			const newPoint = {
				x: Math.cos(this.RADIAN * i)* this.OFFSET + this.centerPos.x,
				y: Math.sin(this.RADIAN * i) * this.OFFSET + this.centerPos.y
			}

			const newBody = Bodies.rectangle(
				newPoint.x, newPoint.y, 60, 60, 
				{
					...draggable,
					chamfer: {
						radius: 30
					} 
				}
			)
			newBody.frictionAir = 0.05
			Composite.add(this.rings, newBody)
		}

	}
}
