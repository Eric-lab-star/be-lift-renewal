"use client";
import { animated, useTrail, useTransition } from "@react-spring/web";
import React, { CSSProperties, ReactNode, useState } from "react";

const Boxes = [
  { name: "A", key: "1", center: false },
  { name: "B", key: "2", center: false },
  { name: "C", key: "3", center: false },
  { name: "D", key: "4", center: false },
  { name: "E", key: "5", center: true },
  { name: "F", key: "6", center: false },
];

export default function Home() {
  const [open, set] = useState(false);
  return (
    <div className="container border-amber-500 border-2 border-dashed mx-auto">
      <button onClick={()=>set(!open)} className="rounded-md bg-amber-500 p-2">
        click
      </button>
      <Trail open={open}>
        <div>Hello</div>
        <div>My</div>
        <div>Fans</div>
      </Trail>
    </div>
  );
}

function Trail({ open, children }: { open: boolean,children: ReactNode }) {
  const items = React.Children.toArray(children);
  const trails = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trails.map((style, index) => (
        <animated.div
          key={index}
          className="inline-block bg-slate-300 w-20 h-20"
          style={style}
        >
          <animated.div>{items[index]}</animated.div>
        </animated.div>
      ))}
    </div>
  );
}
