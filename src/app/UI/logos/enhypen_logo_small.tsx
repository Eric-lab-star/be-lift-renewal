import Image from "next/image";

export default function EnhypenLogoSmall(){
	return <Image 
		src={"/enhypen_logo_small.png"}
		alt={"enhypen logo small"}
		width={25}
		height={25}
		sizes="25"
	/>
}
