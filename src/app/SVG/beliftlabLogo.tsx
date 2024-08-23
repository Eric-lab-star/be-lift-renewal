import Image from "next/image";
import beliftlogo from "../../../public/beliftlab.png"
import clsx from "clsx";

export default function BeLiftLabLogo({className}:{ className:string}) {
	return(
		<Image
			className={clsx(`bg-white-300`, className)}
			src={beliftlogo}
			alt="logo"
		/>
	)
}
