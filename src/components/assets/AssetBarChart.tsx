import React from "react";
import { ChartDataType } from "../../types/assets";

interface AssetBarChartProps {
  chartData: ChartDataType[];
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("ko-KR").format(num);
};

const AssetBarChart: React.FC<AssetBarChartProps> = ({ chartData }) => {
  // 차트 데이터를 자산 크기 순으로 정렬
  const sortedData = [...chartData].sort(
    (a, b) => b.totalAssets - a.totalAssets
  );

  // 최대 자산 값 계산
  const maxAsset = Math.max(...sortedData.map((item) => item.totalAssets));

  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
        후보자별 자산 비교
      </h3>

      <div className="mt-5">
        {sortedData.map((candidate) => (
          <div key={candidate.id} className="mb-4">
            <div className="flex items-center">
              <div className="w-36 text-sm font-medium text-gray-900 truncate pr-2">
                {candidate.name}
              </div>

              <div className="flex-grow">
                <div className="flex items-center">
                  <div
                    className="h-5 rounded-sm transition-all duration-300"
                    style={{
                      width: `${(candidate.totalAssets / maxAsset) * 100}%`,
                      backgroundColor: candidate.color,
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {formatNumber(candidate.totalAssets)}백만원
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-1 text-xs text-gray-500">{candidate.party}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-xs text-gray-500">* 백만원 단위로 표시</div>
    </div>
  );
};

export default AssetBarChart;
