import { Bodies } from "matter-js";

export const draggable= {
	inertia: Infinity,
	frictionAir: 1,
}
export const floatingButton = Bodies.rectangle(
	700, 350, 100, 100,
	{
		...draggable,
		label: "floatingButton",
		chamfer: {
			radius: 50
		}
	}
);
