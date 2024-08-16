import { Bodies, Body, Composite, Detector, Events, Vector } from "matter-js";
import { draggable } from "./bodies";

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
					) + RingUI.STEP
				const velocity = {x : Math.cos(radian) * accel, y: Math.sin(radian) * accel}
				if (accel< 1.5){
					accel += 0.01;
				}

				Body.setVelocity(body, velocity)
			}, RingUI.callBackDelay)
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
					) + RingUI.STEP

				const velocity = {x : -1 * Math.cos(radian) * accel, y: -1 * Math.sin(radian) * accel}
				if (accel < 1.5){
					accel += 0.01;
				}

				Body.setVelocity(body, velocity)
			}, RingUI.callBackDelay)
		})

	}

	public removeRing(){
		Composite.remove(this.world, this.compo)
	}

	public isAdded(){
		return !!Composite.get(this.world, this.compo.id, this.compo.type)
	}

	private trail: {position: {x: number, y: number}}[][] = [];
	private manyBox: {position: Vector}[] | null = null;
	private startTime: number = Date.now();
	private currentTime: number = Date.now();
	private timerOn = true;
	private SECOND = 1000;
	public motion(mouse: Matter.MouseConstraint, render: Matter.Render){
		let centerBody: Body | null;
		Events.on(mouse,"startdrag", (e)=>{
			this.startTime = Date.now();
			this.manyBox = null;
			this.trail = []
			centerBody = e.source.body;
		})

		Events.on(render, 'afterRender', ()=> {
			if(this.manyBox === null) return;
			if (this.timerOn){
				this.startTime = Date.now();
				this.timerOn = false
			}
			this.currentTime = Date.now();

			deepCopyRings(this.manyBox, this.trail)
			drawTrail(this.trail, render.context)
			popTrail(this.trail, 300)
			
			if(this.currentTime - this.startTime > 10 * this.SECOND){
				stopTrailDrawing(this.trail, this.manyBox, this.timerOn)
			}
		});

		let whirlwindOpen = false;
		Events.on(mouse, "mouseup", ()=>{
			
			this.manyBox = []
			this.trail = []
			
			if(whirlwindOpen){
				this.reverseWhirlwind()
				shallowCopyRings(this.bodies, this.manyBox)
				whirlwindOpen = false
				return;
			}

			if(centerBody && centerBody.label === "floatingButton"){
				this.setRingCenter(centerBody)
				shallowCopyRings(this.bodies, this.manyBox)
				this.whirlwind()
				whirlwindOpen = true;
				centerBody = null 
			}
		})
	}

}


interface IPos {
	position: {
		x: number;
		y: number;
	}
}

function stopTrailDrawing(trailQueue: IPos[][], manyBox: IPos[] | null, timer: boolean){
	trailQueue = [];
	manyBox = null;
	timer = true;
}

function popTrail(trailQue: IPos[][], limit: number){
	if ( typeof trailQue[0] == "object" && trailQue[0].length > limit) {
		for (let i = 0; i < trailQue.length; i++){
			trailQue[i].pop()
		}
	}
}

function drawTrail(trailQueue: IPos[][], context: CanvasRenderingContext2D ){
	for (let i = 0; i < trailQueue.length; i++){
		for (let j = 0; j  < trailQueue[i].length; j ++) {
			const point = trailQueue[i][j].position
			const rgbRange =  Math.floor(360 - j) < 0 ? 0 : Math.floor(360 - j)
			context.fillStyle = `hsl(${rgbRange}, 55%, 35%)`
			context.fillRect(point.x, point.y, 2, 2);
		}	
	}
}

function deepCopyRings(origin: IPos[], dest: IPos[][]){
	for (let i = 0; i < origin.length; i++){
		if(!dest[i]){
			dest[i] = []
		}
		//deep copy
		const copyObj = {position: {x: origin[i].position.x, y: origin[i].position.y}} 
		dest[i].unshift(copyObj)
	}
}


function shallowCopyRings(ringBodies: Body[], dest: IPos[] ){
		ringBodies.map((v,i)=>{
			if(dest){
				dest[i] = {position : v.position}
			}
		});
}
