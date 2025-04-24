import React from "react";

interface CandidateAsset {
  id: string;
  name: string;
  party: string;
  totalAssets: number;
  mainAssets: string;
  source: string;
  color: string;
}

interface AssetsComparisonProps {
  candidateA: CandidateAsset;
  candidateB: CandidateAsset;
}

export const AssetsComparison: React.FC<AssetsComparisonProps> = ({
  candidateA,
  candidateB,
}) => {
  // 두 후보 중 더 부유한 후보의 자산으로 나누어 비율 계산
  const wealthRatio = Math.max(
    candidateA.totalAssets / candidateB.totalAssets,
    candidateB.totalAssets / candidateA.totalAssets
  ).toFixed(1);

  // 두 후보 중 더 부유한 쪽을 식별
  const richerCandidate =
    candidateA.totalAssets > candidateB.totalAssets ? candidateA : candidateB;
  const poorerCandidate =
    candidateA.totalAssets > candidateB.totalAssets ? candidateB : candidateA;

  // 비율 계산(0-100%)
  const calculatePercentage = (candidate: CandidateAsset) => {
    const maxAssets = Math.max(candidateA.totalAssets, candidateB.totalAssets);
    return (candidate.totalAssets / maxAssets) * 100;
  };

  const percentageA = calculatePercentage(candidateA);
  const percentageB = calculatePercentage(candidateB);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">
        {candidateA.name} vs {candidateB.name}
      </h3>
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-indigo-600">
          {wealthRatio}배
        </span>
        <p className="text-gray-600 mt-1">
          {richerCandidate.name}님은 {poorerCandidate.name}님보다 {wealthRatio}
          배 더 부유합니다
        </p>
      </div>

      <div className="space-y-6">
        {/* 첫 번째 후보 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: candidateA.color }}
              ></div>
              <span className="font-medium">{candidateA.name}</span>
            </div>
            <span className="font-semibold">
              {(candidateA.totalAssets / 100).toFixed(0)}억원
            </span>
          </div>
          <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${percentageA}%`,
                backgroundColor: candidateA.color,
              }}
            ></div>
          </div>
        </div>

        {/* 두 번째 후보 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: candidateB.color }}
              ></div>
              <span className="font-medium">{candidateB.name}</span>
            </div>
            <span className="font-semibold">
              {(candidateB.totalAssets / 100).toFixed(0)}억원
            </span>
          </div>
          <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${percentageB}%`,
                backgroundColor: candidateB.color,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
