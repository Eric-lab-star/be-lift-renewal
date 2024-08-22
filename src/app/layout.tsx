"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./UI/navigationBar";
import clsx from "clsx";
import Footer from "./UI/footer";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

	const [theme, setTheme] = useState("light")

	useEffect(()=>{
		if (window.matchMedia('(prefers-color-scheme: dark)').matches){
			setTheme("dark")
		}else{
			setTheme("light")
		}
	},[])

	function toggleTheme(){
		if(theme === "dark"){
			setTheme("light")
		}else{
			setTheme("dark")
		}
	}
  return (
    <html lang="ko">
		<head>
			<title>be:lift</title>
		</head>
		  <body className={
			  clsx(
				  inter.className,
				  theme
			  )
		  }>
			  <NavBar toggleTheme={toggleTheme} theme={theme}/>
			  <div className="min-h-screen">
				  {children}
			  </div>
			  <Footer/>
		  </body>
    </html>
  );
}
