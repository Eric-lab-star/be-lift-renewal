import { Bodies, Body, Composite, Detector, Vector } from "matter-js";
import { draggable } from "./bodies";

const bodyOpts = { ...draggable,
	chamfer: {
		radius: 30
	},
}

export default class Ring {
	private static OFFSET: number = 80
	private static WIDTH: number = 60
	private static RADIAN: number = Math.PI / 180
	private static step: number = 30
	private static basePoint: Matter.Vector[] = Ring.initBasePoint()
	private static readonly callBackDelay: number  = 10
	private static readonly STEP = 20;
	private animationIds: number[] = [];

	public detector: Matter.Detector;
	private center: Matter.Body
	public bodies: Matter.Body[]
	public compo: Composite
	private world: Matter.World;

	constructor(world: Matter.World, center: Matter.Body){
		this.center = center
		this.world = world
		this.compo = Composite.create({label: "ring"})
		this.bodies = this.initRingBodies()
		this.detector = Detector.create({
			bodies: this.bodies
		})

		Composite.add(this.compo, [this.center, ...this.bodies])
		Composite.add(this.world, this.compo)

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
				Ring.basePoint[i].x + this.center.position.x,
				Ring.basePoint[i].y + this.center.position.y,
				Ring.WIDTH, Ring.WIDTH, {
					...bodyOpts,
					collisionFilter:{
						category: 0b0010,
						mask: 0b001,
					}
				}
			)
			newBody.frictionAir = 0.05
			tmp[i] = newBody;
		}
		return tmp
	}



	public setRingCenter(centerBody: Body){
		this.center= centerBody 
		this.detector.bodies =[ this.center, ...this.bodies ]
		this.bodies.forEach((body,i) =>{
			Body.setPosition(body, Vector.add(centerBody.position, Ring.basePoint[i]))
		})
	}
	
	public whirlwind(){
		const limit = 200;

		this.animationIds.forEach((v)=>{
			clearInterval(v)
		})

		this.bodies.forEach((body,i) => {
			let accel: number = 0.1;
			this.animationIds[i] = window.setInterval(()=>{
				const hypot = 
					Math.hypot(
						body.position.x - this.center.position.x,
						body.position.y - this.center.position.y
					)
				if(hypot > limit){
					Body.setVelocity(body,{x: 0, y:0})
					clearInterval(this.animationIds[i])
				}
				const radian = 
					Math.atan2(
						body.position.y - this.center.position.y,
						body.position.x - this.center.position.x
					) + Ring.STEP
				const velocity = {x : Math.cos(radian) * accel, y: Math.sin(radian) * accel}
				if (accel< 1.5){
					accel += 0.01;
				}

				Body.setVelocity(body, velocity)
			}, Ring.callBackDelay)
		})
	}

	public reverseWhirlwind(){
		this.animationIds.forEach((v)=>{
			clearInterval(v)
		})

		this.bodies.forEach((body,i) => {
			let accel: number = 0.1;

			this.animationIds[i] = window.setInterval(()=>{
				const collision = Detector.collisions(this.detector)

				collision.forEach((group)=>{
					if (group.bodyB.id === body.id){
						Body.setVelocity(body, {x: 0, y:0})
						clearInterval(this.animationIds[i])
					}
				})
				const radian = 
					 Math.atan2(
						body.position.y - this.center.position.y,
						body.position.x - this.center.position.x
					) + Ring.STEP

				const velocity = {x : -1 * Math.cos(radian) * accel, y: -1 * Math.sin(radian) * accel}
				if (accel < 1.5){
					accel += 0.01;
				}

				Body.setVelocity(body, velocity)
			}, Ring.callBackDelay)
		})

	}

	public removeRing(){
		Composite.remove(this.world, this.compo)
	}

	public isAdded(){
		return !!Composite.get(this.world, this.compo.id, this.compo.type)
	}
}
