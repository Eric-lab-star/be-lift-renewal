"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import TopNavBar from "./UI/topNavBar";
import clsx from "clsx";
import { useEffect, useReducer } from "react";
import { darkbg, darkText } from "./styles";
import themesReducer, { ThemeCtx, ThemeDispatchCtx } from "./stateManager/themeManager";
import { SideBarCtx, SideBarDispatchCtx, sideBarReducer } from "./stateManager/sideBarManager";
import SideBar from "./UI/sideBars/sideBar";
import  useMeasure from "react-use-measure"
import { BodyMeasureCtx } from "./stateManager/bodyMeasure";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const [theme, dispatchTheme]  = useReducer(themesReducer, {state: "light"})
	const [sideBarState, dispatchSideBarState] = useReducer(sideBarReducer, false)
	const [bodyRef, bodyMeasure] = useMeasure()

	useEffect(()=>{
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
			dispatchTheme({state:"dark"})
		}else{
			dispatchTheme({state:"light"})
		}
	},[])

	

  return (
    <html>
		<head>
			<title>be:lift</title>
		</head>
			<ThemeCtx.Provider value={theme}>
				<ThemeDispatchCtx.Provider value={dispatchTheme}>
			<SideBarDispatchCtx.Provider value={dispatchSideBarState}>
				<SideBarCtx.Provider value={sideBarState}>
				<BodyMeasureCtx.Provider value={bodyMeasure}>
				  <body ref={bodyRef} className={ clsx( inter.className, theme.state, ) }>
					  <TopNavBar/> 
					  <div className="md:flex">
						<SideBar/>
						<div className={`p-4 dark:${darkText} dark:${darkbg} bg-amber-300 py-20 min-h-screen md:static md:w-full `}>
							{children}
						</div>
					  </div>
				  </body>
				</BodyMeasureCtx.Provider>
				</SideBarCtx.Provider>
			</SideBarDispatchCtx.Provider>
			</ThemeDispatchCtx.Provider>
			</ThemeCtx.Provider>
    </html>
  );
}
