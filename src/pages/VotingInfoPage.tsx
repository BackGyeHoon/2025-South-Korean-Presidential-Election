import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

// 선거 일정 데이터
const ELECTION_SCHEDULE = [
  {
    id: 1,
    title: "예비후보자등록 신청",
    date: "2025. 4. 4(금)부터",
    description: "대통령 선거 예비후보자 등록이 시작됩니다.",
  },
  {
    id: 2,
    title: "후보자등록 신청",
    date: "2025. 5. 10(토) ~ 5. 11(일)",
    time: "[매일 09:00 ~ 18:00]",
    description: "정식 대통령 선거 후보자 등록이 진행됩니다.",
  },
  {
    id: 3,
    title: "재외투표",
    date: "2025. 5. 20(화) ~ 5. 25(일)",
    time: "[매일 08:00 ~ 17:00]",
    description: "해외에 거주하는 유권자를 위한 재외투표가 진행됩니다.",
  },
  {
    id: 4,
    title: "선상투표",
    date: "2025. 5. 26(월) ~ 5. 29(목)",
    description: "선박에 탑승 중인 유권자를 위한 선상투표가 진행됩니다.",
  },
  {
    id: 5,
    title: "사전투표",
    date: "2025. 5. 29(목) ~ 5. 30(금)",
    time: "[매일 06:00 ~ 18:00]",
    description: "선거일 전에 미리 투표할 수 있는 사전투표가 진행됩니다.",
  },
  {
    id: 6,
    title: "선거일 투표",
    date: "2025. 6. 3(화)",
    time: "[06:00 ~ 20:00]",
    description:
      "제21대 대통령 선거일입니다. 전국 투표소에서 투표가 진행됩니다.",
  },
];

// 투표 자격 정보
const VOTING_ELIGIBILITY = {
  title: "투표 자격",
  requirements: [
    "대한민국 국민",
    "만 18세 이상(2007년 6월 4일 이전 출생자)",
    "선거일 기준 주민등록이 되어 있는 자",
    "재외선거인 등록이 되어 있는 재외국민",
  ],
};

// 필요 서류 정보
const REQUIRED_DOCUMENTS = {
  title: "투표 시 필요 서류",
  documents: [
    "주민등록증",
    "운전면허증",
    "여권",
    "공무원증",
    "국가유공자증",
    "장애인등록증(주민등록번호 및 주소가 기재되어 있는 것)",
    "청소년증",
  ],
  note: "* 관공서 또는 공공기관이 발행한 사진이 부착된 신분증으로 주민등록번호가 기재되어 있는 것",
};

const VotingInfoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">투표 안내</h1>
        <p className="text-text-light mb-8">
          제21대 대통령선거 투표와 관련된 주요 일정과 정보를 확인하세요.
        </p>
      </div>

      {/* 대통령 선거 정보 및 일정 섹션 */}
      <section className="mb-12">
        <div className="bg-gray-50 p-6 md:p-8 rounded-lg border border-gray-200 mb-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/images/election-mascot.svg"
              alt="선거 마스코트"
              className="w-32 h-32 mb-4 hidden md:block"
            />
            <h2 className="text-2xl font-bold text-center">
              제21대 대통령선거
            </h2>
            <p className="text-lg font-medium mt-2">투표일 : 2025. 6. 3(화)</p>
          </div>

          {/* 모바일용 타임라인 */}
          <div className="md:hidden space-y-4">
            {ELECTION_SCHEDULE.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-md border border-gray-200"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    {item.id}
                  </div>
                  <h3 className="font-medium text-lg">{item.title}</h3>
                </div>
                <div className="ml-11">
                  <p className="text-primary font-medium">{item.date}</p>
                  {item.time && (
                    <p className="text-text-light text-sm">{item.time}</p>
                  )}
                  <p className="mt-2 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 데스크톱용 타임라인 */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left border-b border-gray-200 w-1/4">
                    일정
                  </th>
                  <th className="p-3 text-left border-b border-gray-200 w-1/2">
                    기간
                  </th>
                  <th className="p-3 text-left border-b border-gray-200 w-1/4">
                    설명
                  </th>
                </tr>
              </thead>
              <tbody>
                {ELECTION_SCHEDULE.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">{item.title}</td>
                    <td className="p-3">
                      <span className="text-primary font-medium">
                        {item.date}
                      </span>
                      {item.time && (
                        <span className="block text-text-light text-sm">
                          {item.time}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-sm">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 투표 자격 및 필요 서류 섹션 */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
          <h2 className="text-xl font-bold mb-4 text-primary">
            {VOTING_ELIGIBILITY.title}
          </h2>
          <ul className="space-y-2">
            {VOTING_ELIGIBILITY.requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs">
                  ✓
                </div>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
          <h2 className="text-xl font-bold mb-4 text-primary">
            {REQUIRED_DOCUMENTS.title}
          </h2>
          <ul className="space-y-2">
            {REQUIRED_DOCUMENTS.documents.map((doc, index) => (
              <li key={index} className="flex items-start">
                <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs">
                  ✓
                </div>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
          <p className="text-text-light text-sm mt-4">
            {REQUIRED_DOCUMENTS.note}
          </p>
        </div>
      </section>

      {/* 투표소 찾기 섹션 */}
      <section className="mb-12">
        <div className="bg-primary bg-opacity-5 p-6 md:p-8 rounded-lg border border-primary border-opacity-20 text-center">
          <h2 className="text-xl font-bold mb-3">내 투표소 찾기</h2>
          <p className="mb-6 text-text-light">
            가까운 투표소 위치를 확인하세요.
          </p>
          <Button asChild size="lg">
            <a
              href="https://www.nec.go.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              중앙선거관리위원회 바로가기
            </a>
          </Button>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section>
        <div className="bg-gray-100 p-6 md:p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">
            소중한 한 표, 대한민국의 미래를 결정합니다
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            투표는 국민의 권리이자 의무입니다. 여러분의 한 표가 우리나라의
            미래를 결정하는 소중한 가치입니다. 투표에 적극적으로 참여해주세요.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/pledges">후보자 공약 보러가기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default VotingInfoPage;
