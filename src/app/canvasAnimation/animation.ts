import  { Body,Composite, Detector, Engine, Events, Mouse, MouseConstraint, Render, Runner, Vector } from "matter-js";
import {  floatingButton } from "./bodies";
import Ring from "./ring";

const SECOND = 1000;

export default class Animation{
	public readonly runner = Runner.create();
	public readonly engine = Engine.create({
		gravity:{
			scale: 0,
		}
	});
	public readonly render: Render;

	private world: Matter.World = this.engine.world;
	private mouse: Mouse;
	private mouseConstraint : MouseConstraint;
	private canvas: HTMLCanvasElement;
	private ringUI: Ring;

	constructor(canvas: HTMLCanvasElement){
		this.canvas = canvas,
		this.render = Render.create({
		  canvas: canvas,
		  engine: this.engine,
		  options: {
			wireframes: true,
			background: 'transparant',
			showIds: true,
			width: canvas.width,
			height: canvas.height,
		  }
		});
		this.mouse = Mouse.create(this.render.canvas)
		this.mouseConstraint = MouseConstraint.create(this.engine, {
			mouse: this.mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false,
				}
			}
		});
		Body.setPosition(floatingButton, {x: this.canvas.width/ 2, y: this.canvas.height /2})
		this.ringUI = new Ring(this.world, floatingButton)
	}

	public terminate(){
		Render.stop(this.render)
		Runner.stop(this.runner)
		Engine.clear(this.engine)
	}

	public start(){
		this.canvas.width = 1200;
		this.canvas.height = 800;
		this.render.mouse = this.mouse;
		Render.run(this.render);
		Runner.run(this.runner, this.engine);
	}

	private trail: {position: {x: number, y: number}}[][] = [];
	private manyBox: {position: Vector}[] | null = null;
	private startTime: number = Date.now();
	private currentTime: number = Date.now();
	private timerOn = true;

	public connectEvent(){
		let centerBody: Body | null;

		Events.on(this.mouseConstraint,"startdrag", (e: Matter.IEvent<MouseConstraint>)=>{
			this.startTime = Date.now();
			this.manyBox = null;
			this.trail = []
			centerBody = e.source.body;
		})

		Events.on(this.render, 'afterRender', ()=> {
			if(this.manyBox === null) return;
			if (this.timerOn){
				this.startTime = Date.now();
				this.timerOn = false
			}
			this.currentTime = Date.now();

			deepCopyRings(this.manyBox, this.trail)
			drawTrail(this.trail, this.render.context)
			popTrail(this.trail, 300)
			
			if(this.currentTime - this.startTime > 10 * SECOND){
				stopTrailDrawing(this.trail, this.manyBox, this.timerOn)
			}
		});

		let whirlwindOpen = false;
		Events.on(this.mouseConstraint, "mouseup", ()=>{
			
			this.manyBox = []
			this.trail = []
			
			if(whirlwindOpen){
				this.ringUI.reverseWhirlwind()
				shallowCopyRings(this.ringUI.bodies, this.manyBox)
				whirlwindOpen = false
				return;
			}

			if(centerBody && centerBody.label === "floatingButton"){
				this.ringUI.setRingCenter(centerBody)
				shallowCopyRings(this.ringUI.bodies, this.manyBox)
				this.ringUI.whirlwind()
				whirlwindOpen = true;
				centerBody = null 
			}
		})

		Events.on(this.engine, "collisionStart", ()=>{
			const collisions = Detector.collisions(this.ringUI.detector)
			console.log(collisions)
		})
	
	}

	public demo(){
		
		Composite.add(this.world, [this.mouseConstraint]);
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



function removeAllComposites(world: Matter.World, label: String){
	const allRings = getAllComposites(world, label)
	if (allRings.length > 0) {
		allRings.forEach(el => Composite.remove(world, el))
	}
	return;
}

function getAllComposites(world: Matter.World, label: String): Composite[] {
	return	Composite.allComposites(world).filter(compo => compo.label === label);
}

function getFirstComposite(world: Matter.World, label: String): Composite | undefined {
	return	Composite.allComposites(world).find(compo => compo.label === label);
}

function whirlBodies(bodies: Matter.Body[], center: Matter.Vector){
	const STEP = 20;
	const LIMIT = 200;
	bodies.forEach(body => {
		let id: number;
		id = window.setInterval(()=>{
			const hypot = Math.hypot(body.position.x - center.x, body.position.y - center.y)
			if(hypot > LIMIT){
				Body.setVelocity(body,{x: 0, y:0})
				clearInterval(id)
			}
			const radian = Math.atan2(body.position.y - center.y, body.position.x - center.x) + STEP
			const velocity = {x : Math.cos(radian), y: Math.sin(radian)}
			Body.setVelocity(body, velocity)
		},100)
		
	})
}





