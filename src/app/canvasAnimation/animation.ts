import  Matter, { Composite, Engine, Events, Mouse, MouseConstraint, Render, Runner }from "matter-js";
import { floatingButton } from "./bodies";
import RingUI from "./ring";
import PetUI from "./pet";


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
	private ringUI: RingUI;
	private petUI: PetUI;

	constructor(canvas: HTMLCanvasElement ){
		this.canvas = canvas,
		this.render = Render.create({
		  canvas: canvas,
		  engine: this.engine,
		  options: {
			wireframes: false,
			background: 'pink',
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
		this.ringUI = new RingUI(this.world, floatingButton)
		this.petUI = new PetUI(this.world, this.render, this.mouseConstraint)

	}

	public terminate(){
		Render.stop(this.render)
		Runner.stop(this.runner)
		Engine.clear(this.engine)
	}

	public start(){
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight 
		Render.run(this.render);
		Runner.run(this.runner, this.engine);
		this.ringUI.motion(this.mouseConstraint, this.render)
		Composite.add(this.world, [this.mouseConstraint]);
		this.eventsHandler()
	}
	
	

	


	private eventsHandler(){
		Events.on(this.render, "beforeRender", ()=>{
			this.canvas.width = window.innerWidth
			this.canvas.height = window.innerHeight 
		} )


		Events.on(this.engine, "collisionEnd", (e)=>{
			e.pairs.forEach(pair => {
				if(pair.bodyA.label === "cursor" && pair.bodyB.label === "floatingButton" ){
					if(pair.bodyB.render.sprite) {
						pair.bodyB.render.sprite.xScale = 1;
						pair.bodyB.render.sprite.yScale = 1;
					}
				}
			})
		})
		Events.on(this.engine, "collisionStart", (e)=>{
			e.pairs.forEach(pair => {
				if(pair.bodyA.label === "cursor" && pair.bodyB.label === "floatingButton" ){
					if(pair.bodyB.render.sprite) {
						pair.bodyB.render.sprite.xScale = 1.4;
						pair.bodyB.render.sprite.yScale = 1.4;
					}
				}
			})
		})
	}
}




