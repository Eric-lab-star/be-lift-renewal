import Image from "next/image";
import Link from "next/link";
import RightArrow from "../SVG/rightArrow";

export default function Footer() {
	return (
			<div className=" flex flex-col gap-2">
				<div className="">
					<Image 
						src="/beliftFooter.png"
						alt="beflite logo in black"
						width={120}
						height={100}
						sizes="120px"
						className="p-2"
					/>
				</div>
				<div className="px-2 space-y-2">
					<div className="font-semibold">BELIFT LAB inc</div>
					<div className="text-xs space-y-2">
						<p>서울특별시 용산구 한강대로 42(42, Hangang-daero, Yongsan-gu, Seoul, Republic of Korea)</p>
						<p>COPYRIGHT &#169; 2020 BELIFT LAB Copyrights All Rights Reserved.</p>
					</div>
					<div className="h-10 text-xs hover:text-yellow-400">
						<Link href="/privacy" className="flex gap-1 items-center">
							<div>개인정보 처리방침</div>
							<RightArrow />
						</Link>
					</div>
				</div>
			</div>
	)
}

