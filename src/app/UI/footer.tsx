import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<div className="px-32 pt-4">
			<div className="h-32 flex justify-start gap-2">
				<div className="mr-4">
					<Image 
						className="w-auto h-auto"
						src="/beliftFooter.png"
						alt="beflite logo in black"
						width="100"
						height="100"
					/>
				</div>
				<div className="w-96">
					<div className="font-semibold">BELIFT LAB inc</div>
					<div className="text-sm">
						<p>서울특별시 용산구 한강대로 42(42, Hangang-daero, Yongsan-gu, Seoul, Republic of Korea)</p>
						<p>COPYRIGHT &#169; 2020 BELIFT LAB Copyrights All Rights Reserved.</p>
					</div>
					<div className="h-10 mt-3 text-sm hover:font-semibold">
						<Link href="/privacy">개인정보 처리방침</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
