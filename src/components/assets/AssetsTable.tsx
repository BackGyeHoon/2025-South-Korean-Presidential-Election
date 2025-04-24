import React from "react";
import { motion } from "framer-motion";
import { ToggleSwitch } from "./ToggleSwitch";

interface CandidateAsset {
  id: string;
  name: string;
  party: string;
  totalAssets: number;
  mainAssets: string;
  source: string;
  color: string;
}

interface AssetsTableProps {
  sortedAssetsData: CandidateAsset[];
  selectedCandidates: string[];
  handleCandidateSelect: (candidateId: string) => void;
  candidateMap: Record<string, { image: string }>;
}

export const AssetsTable: React.FC<AssetsTableProps> = ({
  sortedAssetsData,
  selectedCandidates,
  handleCandidateSelect,
  candidateMap,
}) => {
  return (
    <>
      {/* 모바일용 카드 뷰 */}
      <div className="sm:hidden space-y-4">
        {sortedAssetsData.map((asset) => (
          <div
            key={`mobile-${asset.id}`}
            className={`p-4 rounded-lg transition-all border-l-4 ${
              selectedCandidates.includes(asset.id)
                ? "bg-gray-50"
                : "border-l-transparent hover:border-l-gray-200 hover:bg-gray-50"
            }`}
            style={{
              borderLeftColor: selectedCandidates.includes(asset.id)
                ? asset.color
                : "transparent",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {candidateMap[asset.id] && (
                  <img
                    src={candidateMap[asset.id].image}
                    alt={asset.name}
                    className="w-10 h-10 rounded-full object-cover border-2"
                    style={{ borderColor: asset.color }}
                  />
                )}
                <div>
                  <div className="font-semibold">{asset.name}</div>
                  <span
                    className="px-2 py-0.5 text-xs rounded-full text-white"
                    style={{ backgroundColor: asset.color }}
                  >
                    {asset.party}
                  </span>
                </div>
              </div>
              <ToggleSwitch
                checked={selectedCandidates.includes(asset.id)}
                onChange={() => handleCandidateSelect(asset.id)}
                color={asset.color}
              />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                <span className="text-gray-600">신고 재산 총액</span>
                <span className="font-medium">
                  {new Intl.NumberFormat("ko-KR").format(asset.totalAssets)}{" "}
                  백만원
                </span>
              </div>
              <div className="flex flex-col text-sm border-b border-gray-100 py-2">
                <span className="text-gray-600">주요 자산 구성</span>
                <span className="mt-1">{asset.mainAssets}</span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-gray-600">출처</span>
                <span className="text-gray-600">{asset.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 데스크탑용 테이블 뷰 */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left font-semibold border-b">후보자명</th>
              <th className="p-3 text-left font-semibold border-b">
                소속 정당
              </th>
              <th className="p-3 text-right font-semibold border-b">
                신고 재산 총액
              </th>
              <th className="p-3 text-left font-semibold border-b">
                주요 자산 구성
              </th>
              <th className="p-3 text-left font-semibold border-b">출처</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssetsData.map((asset) => (
              <motion.tr
                key={asset.id}
                className={`hover:bg-gray-50 transition-colors ${
                  selectedCandidates.includes(asset.id) ? "bg-blue-50" : ""
                }`}
                whileHover={{
                  backgroundColor: "rgba(243, 244, 246, 0.5)",
                }}
              >
                <td className="p-3 border-b">
                  <div className="flex items-center gap-3">
                    <ToggleSwitch
                      checked={selectedCandidates.includes(asset.id)}
                      onChange={() => handleCandidateSelect(asset.id)}
                      color={asset.color}
                      size="sm"
                    />
                    {candidateMap[asset.id] && (
                      <img
                        src={candidateMap[asset.id].image}
                        alt={asset.name}
                        className="w-10 h-10 rounded-full object-cover"
                        style={{ border: `2px solid ${asset.color}` }}
                      />
                    )}
                    <span className="font-medium">{asset.name}</span>
                  </div>
                </td>
                <td className="p-3 border-b">
                  <span
                    className="px-2 py-1 text-xs rounded-full text-white inline-block"
                    style={{
                      backgroundColor: asset.color,
                    }}
                  >
                    {asset.party}
                  </span>
                </td>
                <td className="p-3 text-right border-b font-medium whitespace-nowrap">
                  {new Intl.NumberFormat("ko-KR").format(asset.totalAssets)}{" "}
                  백만원
                </td>
                <td className="p-3 border-b text-sm max-w-xs truncate">
                  <div className="max-w-xs truncate">{asset.mainAssets}</div>
                </td>
                <td className="p-3 border-b text-sm text-gray-600">
                  {asset.source}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
