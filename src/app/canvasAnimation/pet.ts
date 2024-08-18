import { Body, Composite, Events, Vector } from "matter-js";
import { cursor, cursorPet,  } from "./bodies";
import { cursorPetIdleSrc, cursorPetRunSrc } from "./imagSrc";

export default class PetUI {

	private cursor: Matter.Body = cursor;
	private cursorPet: Matter.Body = cursorPet;
	private cursorPetRun: string[] = cursorPetRunSrc
	private cursorPetIdle: string[] = cursorPetIdleSrc
	private imagesrcs = [...this.cursorPetRun, ...this.cursorPetIdle]
	private preloadCounter = 0
	private cursorPetTextureIndex = 0;
	private mousePos: Matter.Vector| null = null; 
	private world: Matter.World
	private render: Matter.Render
	private mouseConstraint: Matter.MouseConstraint
	private startTime = 0;

	constructor(world: Matter.World, render: Matter.Render, mouseConstraint: Matter.MouseConstraint){
		this.world = world
		this.render = render
		this.mouseConstraint = mouseConstraint
		Composite.add(this.world, [ this .cursor, this.cursorPet])
		this.eventHandler()
	}


	private setCursorPetTexture(){
			let index = this.cursorPetTextureIndex
			let src: string[] = []
			if(this.cursorPet.velocity.x === 0 && this.cursorPet.velocity.y === 0){
				src = this.cursorPetIdle 
			}else {
				src = this.cursorPetRun
			}

			if(this.cursorPet.render.sprite){
				this.cursorPet.render.sprite.texture = src[index]
				this.cursorPetTextureIndex++
				if(this.cursorPetTextureIndex >= src.length){
					this.cursorPetTextureIndex = 0
				}
			}
		}

	private setCursorPetVelocity(mousePos: Matter.Vector){
			const currentPos = this.cursorPet.position
			const hypot = Math.hypot(currentPos.x - mousePos.x, currentPos.y - mousePos.y)
			if (hypot < 50){
				Body.setVelocity(this.cursorPet, {x: 0, y: 0})
				return
			}
			const radian = Math.atan2(mousePos.y - currentPos.y, mousePos.x - currentPos.x)
			const speed = 1.5
			const newVector = {x: Math.cos(radian), y: Math.sin(radian)}
			Body.setVelocity(this.cursorPet, Vector.mult(newVector, speed))
		}


	private preloadImage(src: string[], index: number){
		if(this.cursorPet.render.sprite){
			this.cursorPet.render.sprite.texture = src[index]
		}
	}


	public eventHandler(){

		Events.on(this.mouseConstraint, "mousemove", (e)=>{
			this.mousePos = e.mouse.position
			Body.setPosition(this.cursor, this.mousePos)
		})

		Events.on(this.render, "beforeRender", ()=>{
			if(this.preloadCounter < this.imagesrcs.length){
				this.preloadImage(this.imagesrcs, this.preloadCounter)
				this.preloadCounter++
			}
		})

		Events.on(this.render, "afterRender", (e)=>{

			if(this.startTime === 0){
				this.startTime = e.timestamp
			}

			const elapsedTime = e.timestamp - this.startTime
		
			
			if(elapsedTime > 100){
				this.startTime = e.timestamp
				this.setCursorPetTexture()
				if(this.mousePos){
					this.setCursorPetVelocity(this.mousePos)
				}
			}
		})

		
	}
}
