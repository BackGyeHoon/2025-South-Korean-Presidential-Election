import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CANDIDATES } from "../data/candidates";
import { Helmet } from "react-helmet";

// 카드 컴포넌트
const RecordCard = ({
  candidate,
  hasRecords,
}: {
  candidate: (typeof CANDIDATES)[number];
  hasRecords?: boolean;
}) => {
  const recordCount = candidate.criminal_records?.length || 0;
  const hasRecordsValue =
    hasRecords !== undefined ? hasRecords : recordCount > 0;

  // 전과 기록이 많은 경우 스크롤 표시 여부 결정 (3개 이상일 경우)
  const showScroll = recordCount > 3;

  // 더보기 토글 상태
  const [showAll, setShowAll] = useState(false);

  // 표시할 전과 기록 수 (더보기 버튼 클릭 시 전체 표시)
  const displayRecords = showAll
    ? candidate.criminal_records
    : candidate.criminal_records?.slice(0, 3);

  return (
    <div
      className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="h-2" style={{ backgroundColor: candidate.color }}></div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">{candidate.name}</h2>
            <p
              className="text-sm px-2 py-0.5 rounded-full inline-block mt-1"
              style={{
                backgroundColor: `${candidate.color}30`,
                color: candidate.color,
              }}
            >
              {candidate.party}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 flex-1">
          <h3 className="text-md font-semibold mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            전과 기록
          </h3>

          {candidate.criminal_records &&
          candidate.criminal_records.length > 0 ? (
            <div className="flex flex-col h-full">
              <p className="text-sm text-gray-500 mb-3">
                {candidate.criminal_records.length}건의 전과 기록이 있습니다.
              </p>
              <div
                className={`space-y-3 ${
                  showScroll
                    ? "max-h-60 overflow-y-auto pr-1 scrollbar-thin"
                    : ""
                }`}
              >
                {displayRecords?.map((record, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg text-sm"
                    style={{
                      wordBreak: "keep-all",
                      overflowWrap: "break-word",
                    }}
                  >
                    <div className="flex flex-wrap items-center mb-1 gap-2">
                      <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-md text-xs font-medium whitespace-nowrap">
                        {record.charge}
                      </span>
                      <span className="text-xs text-gray-500">
                        {record.date}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 mb-1">
                      {record.reason}
                    </p>
                    <p className="text-xs font-medium">
                      선고: {record.sentence}
                    </p>
                  </div>
                ))}
              </div>

              {/* 더보기 버튼 (3개 이상일 경우에만 표시) */}
              {recordCount > 3 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-xs text-blue-500 mt-2 hover:underline"
                >
                  {showAll ? "접기" : `${recordCount - 3}건 더보기`}
                </button>
              )}
            </div>
          ) : (
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-700">전과 기록이 없습니다.</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <Button asChild variant="link">
            <Link to={`/candidates/${candidate.id}`}>상세 정보 보기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const CriminalRecordsPage: React.FC = () => {
  const [candidates, setCandidates] = useState([...CANDIDATES]);
  const [sortMethod, setSortMethod] = useState<"name" | "party" | "count">(
    "count"
  );

  // 정렬 방법에 따라 후보자 정렬
  useEffect(() => {
    let sortedCandidates = [...CANDIDATES];

    switch (sortMethod) {
      case "name":
        sortedCandidates.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "party":
        sortedCandidates.sort((a, b) => a.party.localeCompare(b.party));
        break;
      case "count":
        sortedCandidates.sort((a, b) => {
          const countA = a.criminal_records?.length || 0;
          const countB = b.criminal_records?.length || 0;
          return countB - countA; // 내림차순 (전과 많은 순)
        });
        break;
    }

    setCandidates(sortedCandidates);
  }, [sortMethod]);

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
    >
      <Helmet>
        <title>후보자 전과 기록 | 2025 대선</title>
        <meta
          name="description"
          content="2025 대통령 선거 후보자들의 전과 기록을 확인하세요."
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">후보자 전과 기록</h1>
        <p className="text-gray-600 mb-6">
          2025 대선 후보들의 전과 기록을 한눈에 확인할 수 있습니다.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex-1 md:flex-none">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">현재 정렬 기준</p>
              <div className="flex flex-col sm:flex-row mt-2 gap-2">
                <Button
                  variant={sortMethod === "count" ? "taeguk" : "outline"}
                  onClick={() => setSortMethod("count")}
                  size="sm"
                  className="flex-2 whitespace-nowrap px-2 py-1 h-auto"
                >
                  <span>전과 많은 순</span>
                </Button>
                <Button
                  variant={sortMethod === "name" ? "taeguk" : "outline"}
                  onClick={() => setSortMethod("name")}
                  size="sm"
                  className="flex-1 whitespace-nowrap px-2 py-1 h-auto"
                >
                  <span>이름순</span>
                </Button>
                <Button
                  variant={sortMethod === "party" ? "taeguk" : "outline"}
                  onClick={() => setSortMethod("party")}
                  size="sm"
                  className="flex-1 whitespace-nowrap px-2 py-1 h-auto"
                >
                  <span>정당순</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-medium text-yellow-800 mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            전과 기록 관련 안내
          </h2>
          <p className="text-sm text-yellow-700">
            이 페이지에서 제공하는 전과 기록은 각 후보자가 공개한 정보 및
            언론에서 보도된 내용을 바탕으로 작성되었습니다. 모든 정보는 객관적
            사실 전달을 목적으로 하며, 정치적 의도나 해석이 포함되지 않도록
            제작되었습니다. 전과 기록만으로 후보자를 평가하기보다는 다양한
            정보를 종합적으로 고려하시기 바랍니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-2 sm:px-4">
        {candidates.map((candidate, index) => (
          <div
            key={candidate.id}
            className="grid-item"
            style={{
              animation: `fadeIn 0.5s ease-out forwards`,
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              transform: "translateY(10px)",
              willChange: "transform, opacity",
            }}
          >
            <RecordCard candidate={candidate} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link to="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
};

export default CriminalRecordsPage;
