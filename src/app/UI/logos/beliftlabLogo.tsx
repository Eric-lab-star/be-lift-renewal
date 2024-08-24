import Image from "next/image";
import clsx from "clsx";

export default function BeLiftLabLogo({className}:{ className:string}) {
	return(
		<Image
			className={clsx(`bg-white-300`, className)}
			width={20}
			height={20}
			src={"/beliftlab.png"}
			alt="logo"
			sizes="20"
		/>
	)
}
