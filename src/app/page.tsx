"use client";
import { animated, to, useSpring, useTransition } from "@react-spring/web";
import { useState } from "react";

const Boxes = [
  { name: "A", key: "1", center: false },
  { name: "B", key: "2", center: false },
  { name: "C", key: "3", center: false },
  { name: "D", key: "4", center: false },
  { name: "E", key: "5", center: true },
  { name: "F", key: "6", center: false },
];

export default function Home() {
  const [boxes, setBoxes] = useState(Boxes);
  const [index, setIndex] = useState(0);
  const trans = useTransition(index, {
    from: { x: 100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: -100, opacity: 0 },
  });

  const [springStyle, api] = useSpring(() => ({
    from: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 100, opacity: 0 },
  }));

  function onClick() {
    // setBoxes((prev) => {
    //   const newSet = prev.slice(1, prev.length);
    //   return [...newSet, prev[0]];
    // });
    setIndex((prev) => (prev + 3) % 6);
  }

  return (
    <div className="container border-amber-500 border-2 border-dashed mx-auto">
      <button
        className="rounded-md bg-amber-500 p-2"
        onClick={onClick}
      >
        click
      </button>
      {trans((style, index) => {
				return <animated.div style={style}  className="flex space-x-5 absolute">
				{boxes.slice(index, index+ 3).map(box => <animated.div key={box.key} className="bg-slate-400 w-20 h-20">{box.name}</animated.div>)

				}
				</animated.div>
      })}

      {/* <animated.div */}
      {/*   style={{ ...springStyle }} */}
      {/*   className="h-96 flex  space-x-5 absolute bg-slate-200" */}
      {/* > */}
      {/*   {boxes.slice(0, 3).map((box, index) => { */}
      {/*     return ( */}
      {/*       <div */}
      {/*         key={box.key} */}
      {/*         className="w-20 flex justify-center items-center font-semibold  h-20 bg-amber-400" */}
      {/*       > */}
      {/*         <div>{box.name}</div> */}
      {/*       </div> */}
      {/*     ); */}
      {/*   })} */}
      {/* </animated.div> */}
    </div>
  );
}
