import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CANDIDATES } from "./PledgesPage"; // PledgesPage에서 후보자 데이터 가져오기

// 주요 후보자 섹션을 위한 후보자 데이터 (이제 PledgesPage에서 가져옴)
// const MAIN_CANDIDATES = [
//   {
//     id: "lee-jae-myung",
//     name: "이재명",
//     party: "더불어민주당",
//     image:
//       "https://tse1.mm.bing.net/th?id=OIP.1uzFQZZEwU5u1IjEtVKR_QHaE8&pid=Api",
//     color: "#0050C9",
//   },
//   {
//     id: "han-dong-hoon",
//     name: "한동훈",
//     party: "국민의힘",
//     image:
//       "https://tse3.mm.bing.net/th?id=OIF.qJS43%2brS%2fmnIGIOVrDbFpA&pid=Api",
//     color: "#E61E2B",
//   },
//   {
//     id: "na-kyung-won",
//     name: "나경원",
//     party: "국민의힘",
//     image:
//       "https://tse2.mm.bing.net/th?id=OIF.Dgeq8smNNb1ca%2bUo9ircfg&pid=Api",
//     color: "#E61E2B",
//   },
// ];

const HomePage = () => {
  // 랜덤으로 3명의 후보자를 선택하는 state
  const [randomCandidates, setRandomCandidates] = React.useState<
    typeof CANDIDATES
  >([]);

  // 페이지가 로드될 때 랜덤으로 후보자 선택
  React.useEffect(() => {
    // 후보자 배열 복사 및 섞기
    const shuffled = [...CANDIDATES].sort(() => 0.5 - Math.random());
    // 랜덤으로 3명만 선택
    setRandomCandidates(shuffled.slice(0, 3));
  }, []);

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-primary/5 to-accent py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
                2025년 대한민국
                <br />
                제21대 대통령 선거
              </h1>
              <p className="text-lg md:text-xl text-text-light mb-8">
                대한민국의 미래를 결정할 선거, 투명하고 정확한 정보로 현명한
                선택을 도와드립니다.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/comparison">공약 비교하기</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/voting-info">투표 안내 보기</Link>
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <img
                src="/images/korea-map.png"
                alt="대한민국 지도"
                className="w-3/4 lg:w-4/5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 주요 정보 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            주요 선거 정보
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              title="선거일"
              icon={<CalendarIcon />}
              description="2025년 6월 3일 (화)"
              details="오전 6시부터 오후 6시까지"
            />

            <InfoCard
              title="사전투표"
              icon={<CheckCircleIcon />}
              description="2025년 5월 29일 ~ 5월 30일"
              details="오전 6시부터 오후 6시까지"
            />

            <InfoCard
              title="투표 자격"
              icon={<UserIcon />}
              description="만 18세 이상 대한민국 국민"
              details="2007년 3월 6일 4일 이전 출생자"
            />
          </div>
        </div>
      </section>

      {/* 후보자 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">주요 후보자</h2>
          <p className="text-text-light text-center mb-2">
            각 후보자의 공약과 주요 정책을 확인해보세요
          </p>
          <p className="text-primary/70 text-center mb-12 text-sm italic">
            * 아래 후보자는 무작위로 선정되어 표시됩니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                name={candidate.name}
                party={candidate.party}
                image={candidate.image}
                color={candidate.color}
                id={candidate.id}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/pledges">후보자 공약 자세히 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            대한민국의 미래, 여러분의 한 표가 결정합니다
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            투표는 민주주의의 가장 기본적인 권리이자 의무입니다. 소중한 한 표로
            우리나라의 미래를 함께 만들어 가세요.
          </p>
          <Button
            asChild
            variant="default"
            size="lg"
            className="text-white font-medium text-md border-2 border-white"
          >
            <Link to="/voting-info" className="px-10 py-3">
              투표 방법 알아보기
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

// 아이콘 컴포넌트들
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// 정보 카드 컴포넌트
const InfoCard = ({
  title,
  icon,
  description,
  details,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-lg font-medium mb-1">{description}</p>
      <p className="text-text-light">{details}</p>
    </div>
  );
};

// 후보자 카드 컴포넌트
const CandidateCard = ({
  name,
  party,
  image,
  color,
  id,
}: {
  name: string;
  party: string;
  image: string;
  color: string;
  id: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      <div className="h-4" style={{ backgroundColor: color }}></div>
      <div className="p-6">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gray-100">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-bold text-center">{name}</h3>
        <p className="text-text-light text-center">{party}</p>

        <div className="mt-4 text-center">
          <Button asChild variant="ghost" className="text-primary">
            <Link to={`/candidates/${id}`}>자세히 보기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
