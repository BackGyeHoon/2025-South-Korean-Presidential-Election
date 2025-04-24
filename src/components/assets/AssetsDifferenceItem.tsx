import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CandidateAsset {
  id: string;
  name: string;
  party: string;
  totalAssets: number;
  mainAssets: string;
  source: string;
  color: string;
}

interface AssetsDifferenceItemProps {
  candidate: CandidateAsset;
  nextCandidate: CandidateAsset;
  isActive: boolean;
  activeComparison: string | null;
  toggleComparisonDetail: (candidateId: string) => void;
  candidateMap: Record<string, { image: string }>;
  filteredAssetsData: CandidateAsset[];
}

export const AssetsDifferenceItem: React.FC<AssetsDifferenceItemProps> = ({
  candidate,
  nextCandidate,
  isActive,
  toggleComparisonDetail,
  candidateMap,
  filteredAssetsData,
}) => {
  const difference = candidate.totalAssets - nextCandidate.totalAssets;
  const differenceInBillion = difference / 100;
  const ratio = candidate.totalAssets / nextCandidate.totalAssets;

  return (
    <motion.div
      key={`diff-${candidate.id}-${nextCandidate.id}`}
      className={`p-4 rounded-lg transition-all cursor-pointer ${
        isActive ? "bg-gray-50 shadow-sm" : "bg-white hover:bg-gray-50"
      }`}
      onClick={() => toggleComparisonDetail(candidate.id)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="flex items-center sm:flex-row gap-1 sm:gap-3">
            <div className="flex items-center gap-1">
              <div
                className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shrink-0"
                style={{ backgroundColor: candidate.color }}
              >
                {candidateMap[candidate.id] && (
                  <img
                    src={candidateMap[candidate.id].image}
                    alt={candidate.name}
                    className="w-full h-full object-cover mix-blend-luminosity opacity-70"
                  />
                )}
              </div>
              <span className="font-medium whitespace-nowrap">
                {candidate.name}
              </span>
            </div>
            <span className="mx-1 hidden sm:block">vs</span>
            <div className="flex items-center gap-1">
              <div
                className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shrink-0"
                style={{ backgroundColor: nextCandidate.color }}
              >
                {candidateMap[nextCandidate.id] && (
                  <img
                    src={candidateMap[nextCandidate.id].image}
                    alt={nextCandidate.name}
                    className="w-full h-full object-cover mix-blend-luminosity opacity-70"
                  />
                )}
              </div>
              <span className="font-medium whitespace-nowrap">
                {nextCandidate.name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <div className="text-sm font-semibold px-3 py-1 rounded-full bg-gray-100">
            {ratio.toFixed(1)}배
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isActive ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* 항상 보이는 진행 바 - 디자인 개선 */}
      <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden mb-6">
        {/* 첫 번째 후보자(더 많은 재산) 바 */}
        <div className="relative h-10 mb-2">
          <div
            className="h-full rounded-lg absolute top-0 left-0 flex items-center pl-3"
            style={{
              width: `${
                (candidate.totalAssets / filteredAssetsData[0].totalAssets) *
                100
              }%`,
              backgroundColor: `${candidate.color}aa`,
              minWidth: "60px",
            }}
          >
            <div className="flex items-center gap-1">
              <div
                className="w-5 h-5 rounded-full overflow-hidden border-2 border-white shrink-0"
                style={{ backgroundColor: candidate.color }}
              >
                {candidateMap[candidate.id] && (
                  <img
                    src={candidateMap[candidate.id].image}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <span className="text-xs font-semibold text-white drop-shadow-sm">
                {new Intl.NumberFormat("ko-KR").format(
                  candidate.totalAssets / 100
                )}
                억원
              </span>
            </div>
          </div>
        </div>

        {/* 두 번째 후보자 바 */}
        <div className="relative h-10">
          <div
            className="h-full rounded-lg absolute top-0 left-0 flex items-center pl-3"
            style={{
              width: `${
                (nextCandidate.totalAssets /
                  filteredAssetsData[0].totalAssets) *
                100
              }%`,
              backgroundColor: `${nextCandidate.color}aa`,
              minWidth: "60px",
            }}
          >
            <div className="flex items-center gap-1">
              <div
                className="w-5 h-5 rounded-full overflow-hidden border-2 border-white shrink-0"
                style={{ backgroundColor: nextCandidate.color }}
              >
                {candidateMap[nextCandidate.id] && (
                  <img
                    src={candidateMap[nextCandidate.id].image}
                    alt={nextCandidate.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <span className="text-xs font-semibold text-white drop-shadow-sm whitespace-nowrap">
                {new Intl.NumberFormat("ko-KR").format(
                  nextCandidate.totalAssets / 100
                )}
                억원
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm font-medium">
        <div className="flex items-center gap-1">
          <span className="font-semibold">{ratio.toFixed(1)}</span>
          <span className="text-gray-600">배 차이</span>
        </div>
        <div>
          <span className="text-gray-900">차이: </span>
          <span className="text-red-600">
            {new Intl.NumberFormat("ko-KR").format(differenceInBillion)} 억원
          </span>
        </div>
      </div>

      {/* 상세 정보 (토글되는 영역) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-100"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: candidate.color }}
                  ></div>
                  {candidate.name} 주요 자산
                </h4>
                <p className="text-sm text-gray-600">{candidate.mainAssets}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: nextCandidate.color }}
                  ></div>
                  {nextCandidate.name} 주요 자산
                </h4>
                <p className="text-sm text-gray-600">
                  {nextCandidate.mainAssets}
                </p>
              </div>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg mt-2">
              <div className="font-medium text-sm mb-1">비교 분석</div>
              <p className="text-sm text-gray-600">
                {candidate.name} 후보는 {nextCandidate.name} 후보보다 약{" "}
                {ratio.toFixed(1)}배 많은 재산을 보유하고 있으며, 그 차이는{" "}
                {new Intl.NumberFormat("ko-KR").format(differenceInBillion)}{" "}
                억원입니다.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
