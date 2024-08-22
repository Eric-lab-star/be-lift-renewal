export default function PrivacyComplain(){
	return(
		<div className="dark:divide-zinc-300 dark:border-zinc-300 text-sm grid grid-rows-5 grid-flow-col divide-y divide-black divide-x border-b border-r border-black">
			<div className="dark:border-zinc-300 font-semibold border-t border-l border-black p-3 col-span-2">개인정보책임자</div>
			<div className="p-3">성명</div>
			<div className="p-3 col-start-2 row-start-2">여성구</div>
			<div className="p-3">직위</div>
			<div className=" p-3 col-start-2 row-start-3">개인정보보호책임자(CPO)</div>
			<div  className="font-semibold p-3 col-span-2">개인정보 고충처리 담당부서</div>
			<div className="p-3">이메일</div>
			<div className="p-3">privacy-noreply@belift.kr </div>
		</div>
	)
}
