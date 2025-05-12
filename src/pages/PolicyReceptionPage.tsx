import React, { useState, useEffect } from "react";
import { CANDIDATES } from "../data/candidates";
import { Button } from "../components/ui/button";

// candidates.json의 policy_reception 구조에 맞는 타입 정의
interface PolicyItem {
  title: string;
  description: string;
  criticism?: string[];
  positive?: string[];
}

interface PolicyReception {
  most_criticized?: PolicyItem[];
  most_supported?: PolicyItem[];
}

// candidates.json의 데이터 구조에 맞는 타입 확장
interface CandidateWithReception {
  id: string;
  name: string;
  party: string;
  image: string;
  color: string;
  policy_reception?: PolicyReception;
}

const PolicyReceptionPage = () => {
  // 여론 데이터가 있는 후보자만 필터링
  const candidatesWithReception = CANDIDATES.filter(
    (candidate) =>
      candidate.hasOwnProperty("policy_reception") &&
      ((candidate as any).policy_reception?.most_criticized?.length > 0 ||
        (candidate as any).policy_reception?.most_supported?.length > 0)
  ) as unknown as CandidateWithReception[];

  // 모바일 화면 감지
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 선택된 후보자 상태
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    candidatesWithReception.length > 0 ? candidatesWithReception[0].id : null
  );

  // 현재 선택된 후보
  const currentCandidate = candidatesWithReception.find(
    (c) => c.id === selectedCandidate
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">공약 여론 분석</h1>
        <p className="text-text-light mb-6">
          각 후보자의 공약에 대한 여론 분석 정보를 확인하세요.
        </p>
      </div>

      {/* 스티키 후보자 선택 헤더 */}
      <div className="sticky top-28 md:top-32 z-30 bg-white pt-2 pb-4 -mx-4 px-4 shadow-sm border-b border-gray-100 transition-all duration-300">
        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 md:overflow-visible md:flex-wrap md:pb-0">
          <div className="flex gap-2 md:flex-wrap md:gap-2">
            {candidatesWithReception.map((candidate) => (
              <Button
                key={candidate.id}
                variant={
                  selectedCandidate === candidate.id ? "taeguk" : "outline"
                }
                onClick={() => setSelectedCandidate(candidate.id)}
                className="px-3 py-1.5 md:py-1 text-sm whitespace-nowrap flex-shrink-0"
              >
                {candidate.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="mt-8">
        {currentCandidate ? (
          <>
            {/* 후보자 정보 헤더 */}
            <div className="flex items-center mb-8">
              <div
                className="w-1 h-16 mr-4 rounded"
                style={{ backgroundColor: currentCandidate.color }}
              ></div>
              <div className="flex items-center">
                <img
                  src={currentCandidate.image}
                  alt={currentCandidate.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-2xl font-bold">
                    {currentCandidate.name}
                  </h2>
                  <p className="text-text-light">{currentCandidate.party}</p>
                </div>
              </div>
            </div>

            {/* 데스크탑 레이아웃 (두 컬럼) */}
            <div className="hidden md:grid md:grid-cols-2 gap-8">
              {/* 비판 받는 공약 */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-red-600 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                  비판 받는 공약
                </h3>

                {currentCandidate.policy_reception?.most_criticized?.length ? (
                  <div className="space-y-6">
                    {currentCandidate.policy_reception.most_criticized.map(
                      (policy, index) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                        >
                          <h4 className="font-bold text-lg mb-2">
                            {policy.title}
                          </h4>
                          <p className="mb-4 text-sm text-text-light">
                            {policy.description}
                          </p>

                          <div className="mt-4">
                            <h5 className="font-medium text-red-600 mb-2">
                              주요 비판점
                            </h5>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {policy.criticism?.map((point, i) => (
                                <li key={i} className="text-text-light">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-text-light italic">
                    비판 받는 공약 데이터가 없습니다.
                  </p>
                )}
              </div>

              {/* 지지 받는 공약 */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-green-600 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  지지 받는 공약
                </h3>

                {currentCandidate.policy_reception?.most_supported?.length ? (
                  <div className="space-y-6">
                    {currentCandidate.policy_reception.most_supported.map(
                      (policy, index) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                        >
                          <h4 className="font-bold text-lg mb-2">
                            {policy.title}
                          </h4>
                          <p className="mb-4 text-sm text-text-light">
                            {policy.description}
                          </p>

                          <div className="mt-4">
                            <h5 className="font-medium text-green-600 mb-2">
                              긍정적 평가
                            </h5>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {policy.positive?.map((point, i) => (
                                <li key={i} className="text-text-light">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-text-light italic">
                    지지 받는 공약 데이터가 없습니다.
                  </p>
                )}
              </div>
            </div>

            {/* 모바일 레이아웃 (단일 컬럼) */}
            <div className="md:hidden space-y-8">
              {/* 비판 받는 공약 */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-600 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                  비판 받는 공약
                </h3>

                {currentCandidate.policy_reception?.most_criticized?.length ? (
                  <div className="space-y-4">
                    {currentCandidate.policy_reception.most_criticized.map(
                      (policy, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                        >
                          <h4 className="font-bold text-md mb-2">
                            {policy.title}
                          </h4>
                          <p className="mb-3 text-sm text-text-light">
                            {policy.description}
                          </p>

                          <div className="mt-3">
                            <h5 className="font-medium text-red-600 mb-1 text-sm">
                              주요 비판점
                            </h5>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              {policy.criticism?.map((point, i) => (
                                <li key={i} className="text-text-light">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-text-light italic text-sm">
                    비판 받는 공약 데이터가 없습니다.
                  </p>
                )}
              </div>

              {/* 지지 받는 공약 */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  지지 받는 공약
                </h3>

                {currentCandidate.policy_reception?.most_supported?.length ? (
                  <div className="space-y-4">
                    {currentCandidate.policy_reception.most_supported.map(
                      (policy, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                        >
                          <h4 className="font-bold text-md mb-2">
                            {policy.title}
                          </h4>
                          <p className="mb-3 text-sm text-text-light">
                            {policy.description}
                          </p>

                          <div className="mt-3">
                            <h5 className="font-medium text-green-600 mb-1 text-sm">
                              긍정적 평가
                            </h5>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              {policy.positive?.map((point, i) => (
                                <li key={i} className="text-text-light">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-text-light italic text-sm">
                    지지 받는 공약 데이터가 없습니다.
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-text-light">
              공약 여론 데이터가 있는 후보자가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyReceptionPage;
