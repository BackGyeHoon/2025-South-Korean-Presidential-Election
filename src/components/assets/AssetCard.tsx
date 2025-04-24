import React from "react";
import { CandidateAsset } from "../../types/assets";
import candidateImages from "../../data/candidateImages";

interface AssetCardProps {
  asset: CandidateAsset;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("ko-KR").format(num);
};

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  isSelected,
  onToggleSelect,
}) => {
  return (
    <div
      className={`relative rounded-lg border p-4 transition-all duration-200 ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white"
      }`}
    >
      {/* 체크박스 */}
      <div className="absolute right-4 top-4">
        <input
          type="checkbox"
          id={`select-${asset.id}`}
          checked={isSelected}
          onChange={() => onToggleSelect(asset.id)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
        />
      </div>

      <div className="flex">
        {/* 후보자 이미지 */}
        <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
          <img
            src={candidateImages[asset.id] || "/images/placeholder.jpg"}
            alt={`${asset.name} 후보`}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 기본 정보 */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
          <div
            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: `${asset.color}20`,
              color: asset.color,
            }}
          >
            {asset.party}
          </div>
          <div className="mt-1 text-lg font-bold text-gray-900">
            {formatNumber(asset.totalAssets)}백만원
          </div>
        </div>
      </div>

      {/* 추가 정보 */}
      <div className="mt-3 text-sm text-gray-500">
        <p className="mt-1">
          <span className="font-medium text-gray-700">주요 자산:</span>{" "}
          {asset.mainAssets}
        </p>
        <p className="mt-1 text-xs">
          <span className="font-medium text-gray-700">출처:</span>{" "}
          {asset.source}
        </p>
      </div>
    </div>
  );
};

export default AssetCard;
