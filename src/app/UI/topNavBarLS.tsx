import { useContext } from "react";
import { SideBarCtx, SideBarDispatchCtx } from "../stateManager/sideBarManager";
import Link from "next/link";
import BeLiftLabLogo from "./logos/beliftlabLogo";
import { useHover } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";
import OpenBars from "./SVG/openBars";

export default function TopNavBarLS() {
  const sideBarState = useContext(SideBarCtx);
  const [styles, api] = useSpring(() => ({
    scale: 1,
    rotateX: 0,
  }));

  const setSideBarState = useContext(SideBarDispatchCtx);
  const bind = useHover(({ hovering }) => {
    if (hovering) {
      api.start({ rotateX: 360, scale: 1.2 });
    } else {
      api.start({ rotateX: 0, scale: 1 });
    }
  });

  if (sideBarState === null || setSideBarState === null) {
    throw new Error("TopNavBarLS throw error: context not defined");
  }

  function clickBarBTN() {
    if (sideBarState === null) {
      throw new Error("sideBar state is not definded");
    }
    if (setSideBarState === null) {
      throw new Error("sideBar dispatch is not defined");
    }

    if (sideBarState) {
      setSideBarState(false);
    } else {
      setSideBarState(true);
    }
  }

  return (
    <div className="flex-1 flex items-stretch">
      <button onClick={() => clickBarBTN()} className="px-3">
        <OpenBars />
      </button>
      <Link href="/" className="flex items-stretch">
        <animated.div {...bind()} style={styles} className="flex items-center">
          <BeLiftLabLogo className={"h-5 w-5 mr-2"} />
          <div className="font-semibold">BE:LIFTLAB</div>
        </animated.div>
      </Link>
    </div>
  );
}
