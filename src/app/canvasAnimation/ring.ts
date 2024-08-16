import { Bodies, Body, Composite, Detector, Events, Vector } from "matter-js";
import { draggable } from "./bodies";
import TrailUI from "./trails";

const bodyOpts = { ...draggable,
	chamfer: {
		radius: 30
	},
}

export default class RingUI {
	private static OFFSET: number = 80
	private static WIDTH: number = 60
	private static RADIAN: number = Math.PI / 180
	private static step: number = 30
	private static basePoint: Matter.Vector[] = RingUI.initBasePoint()
	private static readonly callBackDelay: number  = 10
	private static readonly STEP = 20;
	private animationIds: number[] = [];

	public detector: Matter.Detector;
	private center: Matter.Body
	public bodies: Matter.Body[]
	public compo: Composite
	private world: Matter.World;
	private trailUI: TrailUI;

	constructor(world: Matter.World, center: Matter.Body){
		this.center = center
		this.world = world
		this.compo = Composite.create({label: "ring"})
		this.bodies = this.initRingBodies()
		this.detector = Detector.create({
			bodies: this.bodies
		})
		this.trailUI = new TrailUI()

		Composite.add(this.compo, [this.center, ...this.bodies])
		Composite.add(this.world, this.compo)
	}

	private static basePos(i: number){
		return {
			x: Math.cos(RingUI.RADIAN * i) * RingUI.OFFSET,
			y: Math.sin(RingUI.RADIAN * i) * RingUI.OFFSET,
		}
	}

	private static initBasePoint(){
		const tmp = []
		for(let i = 1; i < 360; i += RingUI.step){
			const point = RingUI.basePos(i)
			tmp.unshift(point)
		}
		return tmp
	}

	private initRingBodies(){
		const tmp = []
		for (let i = 0; i < RingUI.basePoint.length; i++ ){
			const newBody = Bodies.rectangle(
				RingUI.basePoint[i].x + this.center.position.x,
				RingUI.basePoint[i].y + this.center.position.y,
				RingUI.WIDTH, RingUI.WIDTH, {
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
			Body.setPosition(body, Vector.add(centerBody.position, RingUI.basePoint[i]))
		})
	}
	
	public whirlwind(){
		const limit = 200;
		this.animationIds.forEach((v)=>{
			clearInterval(v)
		})
		this.bodies.forEach((body,i)=> this.whirl(body,i, limit))
	}

	public reverseWhirlwind(){
		this.animationIds.forEach((v)=>{
			clearInterval(v)
		})

		this.bodies.forEach((body,i)=>this.reverseWhirl(body,i))

	}

	public whirl(body: Matter.Body, i: number, limit: number){
		let accel = 1
		this.animationIds[i] = window.setInterval(() => {
			const hypot = Math.hypot(
					body.position.x - this.center.position.x,
					body.position.y - this.center.position.y
				)
			if(hypot > limit){
				Body.setVelocity(body,{x: 0, y:0})
				clearInterval(this.animationIds[i])
			}

			const radian = Math.atan2(
					body.position.y - this.center.position.y,
					body.position.x - this.center.position.x
				) + RingUI.STEP

			const velocity = {
				x : Math.cos(radian) * accel,
				y: Math.sin(radian) * accel
			}

			if (accel < 3){
				accel += 0.01;
			}

			Body.setVelocity(body, velocity)

		}, RingUI.callBackDelay)
	}

	public reverseWhirl(body: Matter.Body, i: number) {
		let accel: number = 1;

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
				) + RingUI.STEP

			const velocity = {x : -1 * Math.cos(radian) * accel, y: -1 * Math.sin(radian) * accel}
			if (accel < 1.5){
				accel += 0.01;
			}

			Body.setVelocity(body, velocity)
		}, RingUI.callBackDelay)
	
	}


	public removeRing(){
		Composite.remove(this.world, this.compo)
	}

	public isAdded(){
		return !!Composite.get(this.world, this.compo.id, this.compo.type)
	}

	public motion(mouse: Matter.MouseConstraint, render: Matter.Render){
		let centerBody: Body | null;

		Events.on(mouse,"startdrag", (e)=>{
			this.trailUI.startTime = Date.now();
			centerBody = e.source.body;
		})

		Events.on(render, 'afterRender', ()=> {
			if(this.trailUI.positions === null) return;
			if (this.trailUI.timerOn){
				this.trailUI.startTime = Date.now();
				this.trailUI.timerOn = false
			}
			this.trailUI.currentTime = Date.now();
			this.trailUI.copyPositions()
			this.trailUI.drawTrail(render.context)
			this.trailUI.popTrail(300)
			
			if(this.trailUI.currentTime - this.trailUI.startTime > 10 * this.trailUI.SECOND){
				this.trailUI.stopTrailDrawing()
			}
		});

		let whirlwindOpen = false;
		Events.on(mouse, "mouseup", ()=>{
			this.trailUI.positions = []
			this.trailUI.trail = []
			this.trailUI.startTime = Date.now();
			
			if(whirlwindOpen){
				this.reverseWhirlwind()
				this.trailUI.shallowCopyRings(this.bodies)
				whirlwindOpen = false
				return;
			}

			if(centerBody && centerBody.label === "floatingButton"){
				this.setRingCenter(centerBody)
				this.trailUI.shallowCopyRings(this.bodies)
				this.whirlwind()
				whirlwindOpen = true;
				centerBody = null 
			}
		})
	}
}







