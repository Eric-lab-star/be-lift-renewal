import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./UI/navigationBar";
import clsx from "clsx";
import Footer from "./UI/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "be:lift:renewal",
  description: "be:liftlab web app renewal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={
		  clsx(
			  inter.className,
		  )
	  }>
	  <NavBar/>
	  <div className=" min-h-screen">
		  {children}
	  </div>
	  <Footer/>
	  </body>
    </html>
  );
}
