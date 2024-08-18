import { Bodies, Collision } from "matter-js";

export const draggable= {
	inertia: Infinity,
	frictionAir: 1,
}


export const cursorPet = Bodies.rectangle(
	700, 100, 30, 20,{
		label: "cursorPet",
		render: {
			fillStyle: "orange",
			sprite: {
				texture: "Crabby/02-Run/Run 01.png",
				xScale: 1.5,
				yScale: 1.5,
			}
		},
		isSensor: true,
	}
);

export const cursor = Bodies.rectangle(
	700, 100, 10, 10,{
		label: "cursor",
		render: {
			fillStyle: "transparent"
		},
		isSensor: true,
	}
);


export const boxC = Bodies.rectangle(
	700, 100, 100, 100
);

export const boxB = Bodies.rectangle(
	300, 300, 100, 100, {
		render: {
			opacity: 1,
			sprite: {
				texture: "logo.png",
				xScale: 1,
				yScale:1,
			}
		},
		label: "boxB",
		isStatic: true,
	}
);


export const boxA = Bodies.rectangle(
	700, 80, 100, 100, {
		collisionFilter: {
			category: 0b00000001,
			mask: 0x0010,
		}
	}
);

export const ground = Bodies.rectangle(
	300, 800, 1000, 100,{
		isStatic: true,
		collisionFilter:{
			category: 0x0010,
			mask: -1,
		}
	}
);

export const boxGroundCollistion = Collision.create(boxA, ground)

export const floatingButton = Bodies.rectangle(
	700, 350, 100, 100,
	{
		label: "floatingButton",
		chamfer: {
			radius: 50
		},
		isStatic: true,
		collisionFilter: {
			category: 0x0001,
			mask: -1,
		},
		render: {
			sprite: {
				texture: "logo.png",
				xScale:1,
				yScale:1,
			}
		}

	}
);
