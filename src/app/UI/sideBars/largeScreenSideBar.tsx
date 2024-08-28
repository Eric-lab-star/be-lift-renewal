import { SideBarCtx } from "@/app/stateManager/sideBarManager";
import { useContext } from "react";
import { links, navLinkStyle } from "./sideBar";
import Link from "next/link";
import clsx from "clsx";
import { darkText } from "@/app/styles";
import Footer from "../footer";

export default function LargeScreenSideBar() {
  const sideBarState = useContext(SideBarCtx);
  return (
    <>
      {sideBarState ? <OpenState /> : <ClosedState />}
    </>
  );
}

function OpenState() {
  return (
    <div
      id="Links"
      className={clsx(
        `dark:bg-amber-700/30 text-sm dark:${darkText} bg-white/80 flex flex-col border-b-gray-300 dark:border-amber-600/10 border w-48 pt-10  h-screen`,
      )}
    >
      <div className="flex-1">
        {links.map((link) => {
          return (
            <Link
              className={clsx(navLinkStyle)}
              key={link.key}
              href={link.path}
            >
              {link.jsx}
              <div>{link.label.toUpperCase()}</div>
            </Link>
          );
        })}
      </div>
      <div className="flex-1 flex items-end">
        <Footer />
      </div>
    </div>
  );
}

function ClosedState() {
  return (
    <div className="pt-10 w-14 h-screen flex flex-col bg-white ">
      {links.map((link) => {
        return (
          <Link className="font-semibold h-14" href={link.path} key={link.key}>
            <div className="rounded-lg hover:bg-slate-200/40 h-full w-full flex items-center justify-center">
              {link.jsx_mini}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
