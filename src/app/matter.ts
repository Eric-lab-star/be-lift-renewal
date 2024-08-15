import  { Bodies, Body,Composite, Engine, Events, Mouse, MouseConstraint, Render, Runner, Vector } from "matter-js";


export default class Animation{
	public runner = Runner.create();
	public engine = Engine.create({
		gravity:{
			scale: 0,
		}
	});
	public render: Render;
	private mouse: Mouse;
	private mouseConstraint : MouseConstraint;
	private canvas: HTMLCanvasElement;

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
	private initDate = true;

	public connectEvent(){
		let body: Body | null;

		Events.on(this.mouseConstraint,"startdrag", (e: Matter.IEvent<MouseConstraint>)=>{
			this.startTime = Date.now();
			this.manyBox = null;
			this.trail = []
			body = e.source.body;
		})

		Events.on(this.render, 'afterRender', ()=> {
			if(this.manyBox === null) return;
			if (this.initDate){
				this.startTime = Date.now();
				this.initDate = false
			}
			this.currentTime = Date.now();

			//  start draw trail

			deepCopyRings(this.manyBox, this.trail)

			drawTrail(this.trail, this.render.context)
			

			if ( typeof this.trail[0] == "object" && this.trail[0].length > 300) {
				for (let i = 0; i < this.trail.length; i++){
					this.trail[i].pop()
				}
			}

			//end 
			
			if(this.currentTime - this.startTime > 10000){
				this.trail = [];
				this.manyBox = null;
				this.initDate = true;
			}
		});

		Events.on(this.mouseConstraint, "mouseup", ()=>{
			this.manyBox = []
			this.trail = []

			resetAllRings(this.engine.world)

			if(body && body.label === "floatingButton"){
				Composite.add(this.engine.world, createRings(body))

				const rings = getFirstRings(this.engine.world)

				if(!rings){
					throw new Error("Faild to find Rings")
				}

				shallowCopyRings(rings.bodies, this.manyBox)
				animateBodies(rings.bodies, body.position)
				body = null 
			}
		})
	}

	public demo(){
		Body.setPosition(floatingButton, {x: this.canvas.width/ 2, y: this.canvas.height /2})
		Composite.add(this.engine.world, [this.mouseConstraint, floatingButton]);
	}

}

interface IPos {
	position: {
		x: number;
		y: number;
	}
}

function drawTrail(trailStack: IPos[][], context: CanvasRenderingContext2D ){
	for (let i = 0; i < trailStack.length; i++){
		for (let j = 0; j  < trailStack[i].length; j ++) {
			const point = trailStack[i][j].position
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



function resetAllRings(world: Matter.World){
	const allRings = getAllRings(world)
	if (allRings.length > 0) {
		allRings.forEach(el => Composite.remove(world, el))
	}
	return;
}

function getAllRings(world: Matter.World): Composite[] {
	return	Composite.allComposites(world).filter(compo => compo.label === "rings");
}

function getFirstRings(world: Matter.World): Composite | undefined {
	return	Composite.allComposites(world).find(compo => compo.label === "rings");
}

function animateBodies(bodies: Matter.Body[], center: {x:number, y:number}){
	bodies.forEach(body => {
		let id: number;
		id = window.setInterval(()=>{
			const hypot = Math.hypot(body.position.x - center.x, body.position.y - center.y)
			if(hypot > 200){
				Body.setVelocity(body,{x: 0, y:0})
				clearInterval(id)
			}
			const radian = Math.atan2(body.position.y - center.y, body.position.x - center.x) + 20
			const velocity = {x : Math.cos(radian), y: Math.sin(radian)}
			Body.setVelocity(body,velocity)
		},100)
		
	})
}

function createRings(centerBody: Body){
	const centerPoint = centerBody.position
	const OFFSET = 120;
	const rings = Composite.create({label: "rings"})
	const RADIAN = Math.PI / 180

	for (let i = 1; i < 360; i += 30){
		const newPoint = {x: Math.cos(RADIAN * i)* OFFSET + centerPoint.x, y: Math.sin(RADIAN * i) * OFFSET + centerPoint.y}
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
		Composite.add(rings, [ newBody])
	}
	return rings
}

const draggable= {
	inertia: Infinity,
	frictionAir: 1,
}

const floatingButton = Bodies.rectangle(
	700, 350, 100, 100,
	{
		...draggable,
		label: "floatingButton",
		chamfer: {
			radius: 50
		}
	}
);

