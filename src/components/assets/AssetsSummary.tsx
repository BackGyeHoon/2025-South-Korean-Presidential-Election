import React from "react";
import { CandidateAsset } from "../../types/assets";

interface AssetsSummaryProps {
  selectedAssets: CandidateAsset[];
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("ko-KR").format(num);
};

export const AssetsSummary: React.FC<AssetsSummaryProps> = ({
  selectedAssets,
}) => {
  if (selectedAssets.length === 0) {
    return (
      <div className="rounded-lg bg-white p-4 shadow">
        <p className="text-center text-gray-500">
          비교할 후보자를 선택해주세요
        </p>
      </div>
    );
  }

  // 평균 자산 계산
  const totalAssets = selectedAssets.reduce(
    (sum, asset) => sum + asset.totalAssets,
    0
  );
  const averageAssets = totalAssets / selectedAssets.length;

  // 최대/최소 자산 후보
  const maxAsset = selectedAssets.reduce(
    (max, asset) => (asset.totalAssets > max.totalAssets ? asset : max),
    selectedAssets[0]
  );

  const minAsset = selectedAssets.reduce(
    (min, asset) => (asset.totalAssets < min.totalAssets ? asset : min),
    selectedAssets[0]
  );

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="text-lg font-medium text-gray-900">
        선택된 후보자 ({selectedAssets.length}명)
      </h3>

      <dl className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* 평균 자산 */}
        <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            평균 자산
          </dt>
          <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
            {formatNumber(Math.round(averageAssets))}백만원
          </dd>
        </div>

        {/* 최대 자산 */}
        <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            최대 자산
          </dt>
          <dd className="mt-1 text-lg font-semibold tracking-tight text-gray-900">
            {maxAsset.name}
          </dd>
          <dd className="text-sm text-gray-600">
            {formatNumber(maxAsset.totalAssets)}백만원
          </dd>
        </div>

        {/* 최소 자산 */}
        <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            최소 자산
          </dt>
          <dd className="mt-1 text-lg font-semibold tracking-tight text-gray-900">
            {minAsset.name}
          </dd>
          <dd className="text-sm text-gray-600">
            {formatNumber(minAsset.totalAssets)}백만원
          </dd>
        </div>
      </dl>

      {/* 선택된 후보 리스트 */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-500">
          선택된 후보자 목록
        </h4>
        <ul className="mt-2 divide-y divide-gray-200">
          {selectedAssets.map((asset) => (
            <li
              key={asset.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center">
                <div
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: asset.color }}
                />
                <span className="text-sm font-medium text-gray-900">
                  {asset.name}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  ({asset.party})
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {formatNumber(asset.totalAssets)}백만원
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssetsSummary;
