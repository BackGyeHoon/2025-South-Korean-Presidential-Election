import React from "react";
import { CandidateAsset } from "../../types/assets";
import candidateImages from "../../data/candidateImages";

interface AssetDetailCardProps {
  asset: CandidateAsset;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("ko-KR").format(num);
};

const AssetDetailCard: React.FC<AssetDetailCardProps> = ({ asset }) => {
  const { id, name, party, totalAssets, mainAssets, source } = asset;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div
        className="px-4 py-5 sm:px-6"
        style={{ backgroundColor: asset.color }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-white">{name}</h3>
          <span className="inline-flex items-center rounded-full bg-white bg-opacity-20 px-3 py-0.5 text-sm font-medium text-white">
            {party}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex items-center p-4">
          <div className="flex-shrink-0 h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-sm">
            <img
              src={candidateImages[id] || "/images/default-profile.jpg"}
              alt={name}
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/default-profile.jpg";
              }}
            />
          </div>

          <div className="ml-6">
            <div className="text-3xl font-bold text-gray-900">
              {formatNumber(totalAssets)}
              <span className="ml-1 text-lg font-normal text-gray-600">
                백만원
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">총 자산</p>
          </div>
        </div>

        <dl className="grid grid-cols-1 divide-y divide-gray-200">
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">주요 자산</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {mainAssets}
            </dd>
          </div>

          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">출처</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {source}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default AssetDetailCard;
