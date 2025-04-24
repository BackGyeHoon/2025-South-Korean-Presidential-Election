import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { CandidateAsset } from "../../types/assets";

interface AssetComparisonChartProps {
  assets: CandidateAsset[];
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("ko-KR").format(num);
};

// nivo bar 차트와 호환되는 데이터 형태 정의
type BarData = {
  name: string;
  totalAssets: number;
  party: string;
  color: string;
  [key: string]: string | number; // 인덱스 시그니처 추가
};

interface BarTooltipProps {
  id: string | number;
  value: number;
  indexValue: string;
  color: string;
  data: BarData;
}

interface BarAriaLabelProps {
  id: string | number;
  value: number;
  indexValue: string | number;
  formattedValue: string;
}

const AssetComparisonChart: React.FC<AssetComparisonChartProps> = ({
  assets,
}) => {
  if (assets.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-white p-6 shadow">
        <p className="text-center text-gray-500">
          비교할 후보자를 선택해주세요
        </p>
      </div>
    );
  }

  // 차트 데이터 정렬 (자산 순) 및 BarData 형태로 변환
  const chartData: BarData[] = [...assets]
    .sort((a, b) => b.totalAssets - a.totalAssets)
    .map((asset) => ({
      name: asset.name,
      totalAssets: asset.totalAssets,
      party: asset.party,
      color: asset.color,
    }));

  return (
    <div className="h-96 rounded-lg bg-white p-6 shadow">
      <h3 className="mb-4 text-lg font-medium text-gray-900">
        후보자 자산 비교
      </h3>
      <div className="h-80">
        <ResponsiveBar
          data={chartData}
          keys={["totalAssets"]}
          indexBy="name"
          margin={{ top: 10, right: 20, bottom: 50, left: 80 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={(bar) => bar.data.color || "#888888"}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: (value: number) => `${formatNumber(value)}백만원`,
            legendPosition: "middle",
            legendOffset: -50,
            truncateTickAt: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          role="application"
          ariaLabel="후보자 자산 비교 차트"
          barAriaLabel={(e) => `${e.indexValue}: ${e.formattedValue}백만원`}
          tooltip={(props) => {
            const data = props.data as unknown as BarData;
            return (
              <div
                style={{
                  padding: "8px",
                  background: "white",
                  color: "#333",
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                  borderRadius: "4px",
                }}
              >
                <strong style={{ color: data.color }}>{data.name}</strong> (
                {data.party})<br />
                <span>총 자산: {formatNumber(data.totalAssets)}백만원</span>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default AssetComparisonChart;
