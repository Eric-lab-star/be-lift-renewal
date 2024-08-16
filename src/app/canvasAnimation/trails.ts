import { Vector } from "matter-js";
import { IPos } from "./position";

export default class TrailUI {

	public trail: {position: {x: number, y: number}}[][] = [];
	public positions: {position: Vector}[] | null = null;
	public startTime: number = Date.now();
	public currentTime: number = Date.now();
	public timerOn = true;
	public SECOND = 1000;
	constructor(){
		
	}

	stopTrailDrawing(){
		this.trail = [];
		this.positions = null;
		this.timerOn = true;
	}

	popTrail(limit: number){
		if ( typeof this.trail[0] == "object" && this.trail[0].length > limit) {
			for (let i = 0; i < this.trail.length; i++){
				this.trail[i].pop()
			}
		}
	}

	drawTrail( context: CanvasRenderingContext2D ){
		for (let i = 0; i < this.trail.length; i++){
			for (let j = 0; j  < this.trail[i].length; j ++) {
				const point = this.trail[i][j].position
				const rgbRange =  Math.floor(360 - j) < 0 ? 0 : Math.floor(360 - j)
				context.fillStyle = `hsl(${rgbRange}, 55%, 35%)`
				context.fillRect(point.x, point.y, 2, 2);
			}	
		}
	}

	copyPositions(){
		if (!this.positions)return;
		for (let i = 0; i < this.positions.length; i++){
			if(!this.trail[i]){
				this.trail[i] = []
			}
			const copyObj = {
				position: {
					x: this.positions[i].position.x,
					y: this.positions[i].position.y
				}
			} 
			this.trail[i].unshift(copyObj)
		}
	}

	shallowCopyRings(ringBodies: Matter.Body[] ){
		ringBodies.map((v,i)=>{
			if(this.positions){
				this.positions[i] = {position : v.position}
			}
		});
	}
}


