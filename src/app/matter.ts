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

	private trail: {position: {x: number, y: number}, speed: number}[][] = [];
	private manyBox: Body[]| null = null;
	private startTime: number = Date.now();
	private currentTime: number = Date.now();
	private initDate = true;

	public connectEvent(){
		let body: Body | null;
		Events.on(this.mouseConstraint,"startdrag", (e: Matter.IEvent<MouseConstraint>)=>{
			this.startTime = Date.now();
			this.trail = [];
			body = e.source.body;
		})

		Events.on(this.render, 'afterRender', ()=> {
			if(this.manyBox === null) return;

			if (this.initDate){
				this.startTime = Date.now();
				this.initDate = false
			}

			this.currentTime = Date.now();
			if(this.currentTime - this.startTime > 10000){
				this.trail = [];
				this.initDate = true;
			}


			this.manyBox.forEach((box) => {
				const tmp = []
				tmp.unshift({
					position: Vector.clone(box.position),
					speed: box.speed
				})
				this.trail.unshift(tmp)
			})

			for (let j = 0; j  < this.trail.length; j ++) {
				for (let i = 0; i < this.trail[j].length; i += 1) {
					const point = this.trail[j][i].position
					const speed = this.trail[j][i].speed;
					
					const hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
					this.render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
					this.render.context.fillRect(point.x, point.y, 2, 2);
				}

			}


			if (this.trail[0].length > 300) {
				this.trail.pop();
			}
		});

		Events.on(this.mouseConstraint, "mouseup", ()=>{
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
				this.manyBox = newBodies
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

