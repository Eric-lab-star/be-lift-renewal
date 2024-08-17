import  { Body,Composite, Engine, Events, Mouse, MouseConstraint, Render, Runner } from "matter-js";
import {  boxB, floatingButton } from "./bodies";
import RingUI from "./ring";


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
	private textNode: HTMLDivElement;
	private ringUI: RingUI;

	constructor(canvas: HTMLCanvasElement, text: HTMLDivElement){
		this.textNode = text
		this.canvas = canvas,
		this.render = Render.create({
		  canvas: canvas,
		  engine: this.engine,
		  options: {
			wireframes: false,
			background: 'transparant',
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
		// this.ringUI = new RingUI(this.world, floatingButton)

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
		// this.ringUI.motion(this.mouseConstraint, this.render)
		Composite.add(this.world, [this.mouseConstraint, this.boxB]);
		this.textNode.style.position = "relative"
		this.textNode.style.top = "40px"
	}
	private boxB = boxB
	private illit = new Event("illit")

	public connectEvent(){
		let body: Matter.Body
		Events.on(this.render, "afterRender", ()=>{
			const posX = this.boxB.position.x
			const posY = this.boxB.position.y
			this.textNode.style.top = `${posY - 50}px`
			this.textNode.style.left = `${posX - 50}px`
		})
		Events.on(this.mouseConstraint, "mouseup", ()=>{
			if (body.label === "boxB"){
				this.textNode.dispatchEvent(this.illit)
			}
		})

		Events.on(this.mouseConstraint, "startdrag", (e)=>{
			body = e.source.body
		})
	}


}




