export default function PrivacyTable1(){
	return (
	<div className="text-sm">
		<div className="grid grid-cols-11 divide-x divide-y divide-black border-r border-b border-black  grid-flow-row">
			<div className="font-semibold border-t border-l border-black flex justify-center items-center"><div className="">분류</div></div>
			<div className="font-semibold col-span-2 flex justify-center items-center">구분</div>
			<div className="font-semibold col-span-2 flex justify-center items-center">수집항목</div>
			<div className="font-semibold col-span-3 flex justify-center items-center">수집 이용 목적</div>
			<div className="font-semibold col-span-3 flex justify-center items-center">보유 및 이용기간</div>
			<div className=" col-start-1 row-span-5 flex justify-center items-center">온라인</div>
			<div className="col-span-2 flex justify-center items-center">필수항목</div>
			<div className="col-span-2 p-2 ">이름, 국가 밎 지역, 성별, 키, 체중, 이메일 수조, 생년월일, 주소, 휴대폰전화번호, 정보주체가 업로드하는 사진, 음원, 영상물 및, 제작물</div>
			<div className="col-span-3 row-span-7 px-2 flex justify-center items-center"> 
				<ul className="list-disc list-inside">
					<li>오디션 합격 여부의 결정 통지 공개</li>
					<li>오디션 정보주세 본인 확인 밎 중복지원 여부 확인</li>
					<li>오디션 개최 알림</li>
					<li>불만 처리 등 민원처리</li>
				</ul>
			</div>
			<div className="col-span-3 row-span-7 flex justify-center items-center">
				<ul className="list-disc list-inside px-2">
					<li>3년 (부정이용 예방 및 방지, 오디션 개최 시 알림)</li>
				</ul>
			</div>
			<div className="col-span-2 p-2">만 14세 미만 정보주체의 법정 대리인 확인 정보</div>
			<div className="col-span-2 p-2">이름,연락처, 이메일주소, 정보주체와의 관계</div>
			<div className="col-span-2 p-2">선택 항목</div>
			<div className="col-span-2 p-2">개인 SNS ID</div>
			<div className="col-span-2 p-2">온라인 오디션 지원시 자동 생성 / 수집되는 정보</div>
			<div className="col-span-2 p-2">이용 시간, 접속 IP 정보 쿠키(cookie)등</div>
			<div className="col-span-2 p-2">이메일 문의 접수시 수집정보</div>
			<div className="col-span-2 p-2">이메일 주소 이름</div>
			<div className="row-span-2 flex justify-center items-center "> 오프라인 </div>
			<div className="col-span-2 p-2 flex justify-center items-center">필수 항목</div>
			<div className="col-span-2 p-2">이메일 주소, 이름, 생년월일, 성별, 키, 주소, 연락처, 보호자 연락처, 취미, 특기, SNS ID, 선호 아티스트 및 음악, 레슨 이력, 관련 경력</div>
			<div className="col-span-2 p-2">선택 항목</div>
			<div className="col-span-2 p-2">소속(학교), 몸무게</div>
		</div>
	</div>
	)
}
