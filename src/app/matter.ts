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

			for (let i = 0; i < this.manyBox.length; i++){
				if(!this.trail[i]){
					this.trail[i] = []
				}
				const copyObj = {position: {x: this.manyBox[i].position.x, y: this.manyBox[i].position.y}} // deep copy
				this.trail[i].unshift(copyObj)
			}

			for (let i = 0; i < this.trail.length; i++){
				for (let j = 0; j  < this.trail[i].length; j ++) {
					const point = this.trail[i][j].position
					const rgbRange =  Math.floor(360 - j) < 0 ? 0 : Math.floor(360 - j)
					this.render.context.fillStyle = `hsl(${rgbRange}, 55%, 35%)`
					this.render.context.fillRect(point.x, point.y, 2, 2);
				}	
			}
			

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

			resetRings(this.engine.world)

			if(body && body.label === "floatingButton"){
				const newCompo = customComposit(body)
				Composite.add(this.engine.world, newCompo)
				const rings = getRings(this.engine.world)
				const newBodies = rings[0].bodies;
				
				newBodies.map((v,i)=>{
					if(this.manyBox){
						//shallow copy
						this.manyBox[i] = {position : v.position}
					}
				});

				animateBodies(newBodies, body.position)
				body = null 
			}

		})

	}

	public demo(){
		Body.setPosition(floatingButton, {x: this.canvas.width/ 2, y: this.canvas.height /2})
		Composite.add(this.engine.world, [this.mouseConstraint, floatingButton]);
	}

}

function resetRings(world: Matter.World){
	const rings = getRings(world)
	if (rings.length > 0) {
		rings.forEach(el => Composite.remove(world, el))
	}
	return;
}

function getRings(world: Matter.World): Composite[] {
	return	Composite.allComposites(world).filter(compo => compo.label === "compositeCircle");
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

function customComposit(targetBody: Body){
	const point = targetBody.position
	const length = 120;
	const compo = Composite.create({label: "compositeCircle"})
	for (let i = 1; i < 360; i += 30){
		const radian = (Math.PI / 180) * i
		const newPoint = {x: Math.cos(radian)* length + point.x, y: Math.sin(radian) * length + point.y}
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
		Composite.add(compo, [ newBody])
	}
	return compo
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

