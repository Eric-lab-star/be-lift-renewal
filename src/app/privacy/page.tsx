import Link from "next/link";
import PrivacyTable1 from "../UI/privacyTable1";
import PrivacyTable2 from "../UI/privacyTable2";
import PrivacyComplain from "../UI/privacyComplain";
import PrivacyManage from "../UI/privacyManage";
import PrivacyService from "../UI/privacyService";

export default function Privacy() {
	return(
		<div className={`pt-4 flex items-center flex-col`}>
		<div className="min-w-96 w-4/6">
		<h1 id="title" className="text-3xl font-bold pb-3">개인정보 처리방침</h1>
			<div className="space-y-3">
				<p className="">본 개인정보처리방침의 경우 대한민국 법률에 따라 작성되었습니다.

주식회사 빌리프랩(이하, ‘회사’라 합니다)은 회사의 아티스트 공연 및 멤버십 운영(이하 ‘서비스’)관련 이용자 개인정보 및 오디션 정보주체의 개인정보를 중요시하며, 개인정보 보호 관한 법률을 준수하고 있습니다.

회사는 개인정보처리방침을 통하여 귀하가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다. 회사는 개인정보보호와 관련된 법률 또는 지침의 변경, 회사 정책의 변경에 따라 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다. 귀하께서는 수시로 확인하시기 바랍니다.</p>

				<p className="font-semibold" id="privacyusage"><Link href="/privacy/#privacyusage"> 1. 개인정보의 수집•이용 목적, 항목, 이용 및 보유기간</Link></p>
				<p className="">오디션 지원서 제출, 합격자 선발 등을 위해 아래와 같은 개인정보는 아래와 같습니다.</p>
				<PrivacyTable1/>
				<p>-개인 정보 수집 방법: 오디션 지원서 작성</p>
				<p className="font-semibold" id="privacysave"><Link href="/privacy/#privacysave"> 2. 개인정보의 보유 및 이용기간</Link></p>
				<p> 원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 자세한 사항은 위에 명시된 보유 및 이용기간을 참고하시기 바라며, 관계법령의 규정에 의하여 일정 기간 동안 개인정보를 보존할 필요가 있는 경우 등에는 해당 기간 동안 정보주체의 정보를 보관합니다.
				</p>
				<p>- 접속기록 등 웹사이트 방문 관련 기록: 3개월(통신비밀보호법)</p>
				<p className="font-semibold" id="privacyterminate"><Link href="/privacy/#privacyterminate"> 3. 개인정보의 파기절차 및 방법</Link></p>
				<p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 바로 파기합니다. 파기 절차 및 방법은 다음과 같습니다.</p>
				<p>- 파기절차</p>
				<p className="pl-3">이용 및 보유기간(보유 및 이용기간 참조) 및 기타 관계 법령에 의한 사유에 따라 일정 기간 저장된 후 파기됩니다. 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보관 이외의 다른 목적으로 이용되지 않고 보유기간 만료 시 파기 됩니다.</p>
				<p>- 파기방법</p>
				<p className="pl-3"> 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 종이에 출력된 개인정보는 파쇄기로 파기합니다. </p>
				<p className="font-semibold" id="privacyprovide"><Link href="/privacy/#privacyprovide">4. 개인정보 제공</Link></p>
				<p>회사는 수집 된 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 오디션 지원자에 대해 오디션 추가 기회 부여 등의 목적으로 아래의 경우에 한하여 국내외 하이브 및 하이브 계열회사에게 정보주체의 동의를 득하여 제공 하고 있으며, 관계 법령에서 정한 적법한 절차를 준수하고 있습니다.</p>
				<PrivacyTable2/>
				<p className="font-semibold" id="childprivacy"><Link href="/privacy/#childprivacy">5. 아동에 대한 정보보호에 관한 사항</Link></p>

				<p>회사는 오디션 신청을 위하여 14세 미만 또는 관할 법률상 이에 상응하는 최소 연령의 아동의 개인정보를 수집할 때에는, 아동 개인정보 보호를 위해 다음과 같은 절차를 추가적으로 거치게 됩니다.</p>
				<p>
					1) 수집한 개인정보 항목, 목적, 공유 여부를 포함한 회사의 개인정보보호 방침에 대하여 보호자에게 통보
				</p>
				<p>
					2) 법정대리인에게 해당 아동의 개인정보에 대한 액세스 / 개인정보의 정정 또는 삭제 / 개인정보 처리의 일시 정지 / 기존에 제공한 동의의 철회를 요청할 수 있는 권한의 부여
				</p>
				<p>
					3) 오디션 참여에 필요한 것 이상의 개인정보 수집의 제한
				</p>
				<p className="font-semibold" id="lawinaction"><Link href="/privacy/#lawinaction"> 6. 정보주체 및 법정 대리인의 권리와 그 행사방법 </Link></p>
				<p>
					- 정보주체 및 법정대리인은 언제든지 등록되어 있는 자신 혹은 당해 만14세 미만 아동의 개인정보를 조회하거나 수정을 요청할 수 있습니다.
				</p>
					- 정보주체 혹은 만14세 미만 아동의 개인정보 조회 및 수정을 위해서는 개인정보보호책임자(CPO)에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.
				<p>
					- 정보주체가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다.
				</p>
				<p>
					- 정보주체 혹은 법정 대리인의 요청에 의해 삭제된 개인정보는 “수집하는 개인정보의 보유 및 이용기간”에 명시된 바에 따라 처리하고 그 이외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
				</p>
				<p className="font-semibold" id="rejection"><Link href="/privacy/#rejection"> 7. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항 </Link></p>
				<p>
				쿠키는 웹사이트를 접속할 때에 해당 웹브라우저를 통해 PC에 저장하는 매우 작은 크기의 텍스트 파일입니다. 이후 다시 웹사이트를 방문할 경우 쿠키의 내용을 읽어 설정한 서비스 이용 환경을 유지하여 편리한 인터넷 서비스 이용을 가능케 합니다. 쿠키에 대한 선택권을 가지고 있으며, 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키의 저장을 거부할 경우에는 서비스의 이용에 불편이 있을 수 있습니다.
				</p>
				<p className="font-semibold" id="cookiereject"> <Link href="/privacy/#cookiereject"> 8. 쿠키 설정 거부 방법</Link> </p>
				<p>
				- 예: 쿠키 설정을 거부하는 방법으로는 정보주체가 사용하시는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
				</p>
				<p>
				{`- 설정방법 예(인터넷 익스플로러의 경우): 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보`}
				</p>
				<p>
				- 단, 정보주체가 쿠키 설치를 거부하였을 경우 서비스 제공에 어려움이 있을 수 있습니다.
				</p>
				<p className="font-semibold" id="protectprivacy"> <Link href="/privacy/#protectprivacy"> 9. 개인정보보호를 위한 기술적/관리적 대책 </Link> </p>
				<p>(1) 회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 누출, 변조, 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 마련하여 적용하고 있습니다.</p>
				<ul className="list-decimal pl-10 space-y-2">
					<li>
이용자의 개인정보는 비밀번호 및 암호화된 정보에 의해 보호되고 있습니다. 그러나, 정보주체의 비밀번호나 개인정보는 공공장소에서의 인터넷사용 등 여러 방법으로 타인에게 알려질 가능성이 높으므로, 이의 보호를 철저히 하는 것이 무엇보다 중요합니다.
그러므로 이용자께서도 개인의 정보를 타인에게 유출시키거나 제공하여서는 안되며, 자신의 개인정보를 책임 있게 관리하여야 합니다. 회사는 이러한 정보주체 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 문제에 대해서 책임을 지지 않습니다.
					</li>
					<li>
회사는 백신프로그램을 이용하여 컴퓨터 바이러스에 의한 피해를 방지하게 위한 조치를 취하고 있으며, 백신프로그램은 주기적으로 업데이트 됩니다. 만일, 바이러스 침투가 될 경우 백신이 나오는 즉시 이를 제공함으로써 치료와 함께 개인정보가 침해되는 것을 방지하고 있습니다.
					</li>
<li> 회사는 서비스에 안전한 암호화 알고리즘을 이용하여 네트워크 상의 개인정보를 전송할 수 있는 방식을 채택하고 있습니다.</li>
				</ul>
				<p>
					(2) 회사는 정보주체의 개인정보보호의 중요성을 인식하고 있으며 이를 위해 개인정보처리직원을 최소한으로 제한하고 있으며 개인정보보호책임자가 처리직원을 대상으로 교육을 주기적으로 실시하여 개인정보보호를 위해 최선을 다하고 있습니다. 또한 본 정책에 명시된 이행사항 및 관련 직원의 준수여부를 정기적으로 점검하여 위반내용이 있는 경우 이를 시정 또는 개선하고 기타 필요한 조치를 취하도록 하고 있습니다.
				</p>
				<p className="font-semibold" id="complain"><Link href="/privacy/#complain">10. 개인정보에 관한 민원서비스</Link></p>
				<p>회사는 정보주체의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보보호책임자를 지정하고 있습니다.</p>
				<PrivacyComplain/>
				<p>정보주체는 회사의 서비스를 이용하며 발생하는 모든 개인정보보호 관련 민원을 개인정보보호책임자 혹은 담당부서로 신고할 수 있습니다. 회사는 정보주체들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.</p>

				<p className="font-semibold" id="manage"><Link href="/privacy/#manage">11. 개인정보 처리 위탁관리</Link></p>
				<p>회사는 서비스 이용 및 계약의 이행, 이용자의 편의 증진을 목적으로 필요 시 개인정보처리방침에 공개한 범위 내에서 개인정보의 처리를 국내외 전문업체에 위탁하고 있습니다.</p>
				<PrivacyManage/>
				<p className="font-semibold" id="complainservice"><Link href="/privacy/#complainservice">12. 의견수렴 및 불만처리</Link></p>
				<p> 1)  회사는 개인정보보호와 관련한 이용자들의 의견과 불만을 제기하여 원활하게 소통과 해결을 할 수 있는 고객상담창구를 운영하고 있습니다. </p>
				 
				<p> 2) 한국의 경우, 이용자와 회사가 개인정보보호와 관련하여 분쟁이 발생하여 개인정보 침해에 관한 상담이 필요한 경우에는 한국인터넷진흥원 개인정보침해신고센터, 경찰청 사이버안전국 등으로 문의하실 수 있습니다. </p>

				<PrivacyService/>
				<p className="font-semibold" id="duty"><Link href="/privacy/#duty">13. 고지의무</Link></p>
				<p>개인정보처리방침은 2020년 11월 30일 최초 제정되었으며, 현 개인정보처리방침은 법률 개정 및 회사의 정책 변경에 따라 내용의 추가, 삭제 및 수정이 있을 시에는 홈페이지를 통해 즉시 공지하며, 이 정책은 공지한 날로부터 시행됩니다</p>



				<p>최초시행일 : 2020.11.30</p>
				<p>개정일 : 2021.02,09(1차)</p>
				<p>개정일 : 2021.04.02(2차)</p>
				<p>개정일 : 2021.09.27(3차)</p>
				<p>개정일 : 2022.03.11(4차)</p>




			</div>
			</div>
		</div>
	)
}
