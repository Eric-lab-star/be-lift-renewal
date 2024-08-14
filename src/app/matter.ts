import  { Bodies, Body,Composite, Constraint, Engine, Events, Mouse, MouseConstraint, Render, Runner, Vector } from "matter-js";


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
	private manyBox: {position: {x:number, y:number}}[]| null = null;
	private startTime: number = Date.now();
	private currentTime: number = Date.now();
	private initDate = true;

	public connectEvent(){
		let body: Body | null;
		Events.on(this.mouseConstraint,"startdrag", (e: Matter.IEvent<MouseConstraint>)=>{
			this.manyBox = null;
			this.startTime = Date.now();
			this.trail = [];
			body = e.source.body;
		})

		Events.on(this.render, 'afterRender', ()=> {
			if(this.trail === null) return;
			if(this.manyBox === null) return;
			if (this.initDate){
				this.startTime = Date.now();
				this.initDate = false
			}

			this.currentTime = Date.now();

			this.trail.unshift({
				position: this.manyBox[0].position,
			})

			console.log(this.trail);

			for (let j = 0; j  < this.trail.length; j ++) {
					const point = this.trail[j].position
					const rgbRange =  Math.floor(360 - j) < 0 ? 0 : Math.floor(360 - j)
					this.render.context.fillStyle = `hsl(${rgbRange}, 55%, 35%)`
					this.render.context.fillRect(point.x, point.y, 2, 2);
			}

			if (this.trail.length > 300) {
				this.trail.pop();
			}

			if(this.currentTime - this.startTime > 10000){
				this.trail = [];
				this.manyBox = null;
				this.initDate = true;
			}
		});

		Events.on(this.mouseConstraint, "mouseup", ()=>{
			// this.trail = null;
			this.manyBox = null;
			this.trail = [];
			this.startTime = Date.now();
			
			const composites = Composite.allComposites(this.engine.world).filter(compo => compo.label === "compositeCircle");
			if (composites.length > 0) {
				composites.forEach(el => Composite.remove(this.engine.world, el))
				return;
			}

			if(body && body.label === "floatingButton"){
				const newCompo = customComposit(body)
				Composite.add(this.engine.world, newCompo)
				const composites = Composite.allComposites(this.engine.world).filter(compo => compo.label === "compositeCircle");
				const newBodies = composites[0].bodies;
				newBodies.map((v,i)=>{
					this.manyBox[i] = v.position
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
		// Body.setVelocity(newBody, {x: Math.cos(radian), y: Math.sin(radian)})
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

