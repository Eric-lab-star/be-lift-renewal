import Image from "next/image";
export default function IllitLogoSmall() {
	return <Image
			src={"/illit_logo_small.png"} 
			alt="small size illit icon"
			width={25}
			height={25}
			sizes="25px"
		/>
}
