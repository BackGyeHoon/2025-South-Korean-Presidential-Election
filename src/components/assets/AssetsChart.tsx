import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { EmptyAssetsChart } from "./EmptyAssetsChart";
import { ChartDataType as AssetChartDataType } from "../../types/assets";

// 차트 컴포넌트에서 사용하는 확장된 ChartDataType
interface ChartDataType extends AssetChartDataType {
  mainAssets?: string;
  source?: string;
}

interface AssetsChartProps {
  chartData: ChartDataType[];
}

export const AssetsChart: React.FC<AssetsChartProps> = ({ chartData }) => {
  // 억 단위로 포맷팅 함수
  const formatToKoreanCurrency = (value: number) => {
    return `${value.toLocaleString()}억 원`;
  };

  // 수치가 너무 크거나 작을 때 라벨 표시 조정 함수
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value, index } = props;

    // 안철수 후보의 재산이 너무 커서 차트에서 라벨 위치 조정
    if (index === 0 && value > 1000) {
      return (
        <text
          x={x + width + 5}
          y={y + 5}
          fill={chartData[index].color}
          textAnchor="start"
          fontWeight="bold"
        >
          {formatToKoreanCurrency(value)}
        </text>
      );
    }

    return (
      <text
        x={x + width + 5}
        y={y + 5}
        fill={chartData[index].color}
        textAnchor="start"
        fontWeight="bold"
      >
        {formatToKoreanCurrency(value)}
      </text>
    );
  };

  if (chartData.length === 0) {
    return <EmptyAssetsChart />;
  }

  return (
    <div className="h-[300px] sm:h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 120, left: 60, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          <XAxis
            type="number"
            domain={[0, "dataMax"]}
            tickFormatter={(value: number) => `${value}억`}
            tick={{ fill: "#666" }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 14, fontWeight: "bold" }}
            axisLine={false}
          />
          <Tooltip
            formatter={(value: number) => [`${value}억 원`, "재산총액"]}
            labelFormatter={(value: string) => `${value} 후보`}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "10px",
            }}
          />
          <Bar
            dataKey="totalAssets"
            name="재산 총액"
            radius={[0, 6, 6, 0]}
            maxBarSize={30}
            barSize={30}
            animationDuration={800}
          >
            {/* 각 데이터 항목에 대해 Cell 컴포넌트를 사용하여 색상 적용 */}
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList dataKey="totalAssets" content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// LabelList 컴포넌트 정의 (recharts의 타입 확장)
type LabelListProps = {
  dataKey: string;
  content: React.ReactElement | React.FC<any>;
};

type LabelList = React.FC<LabelListProps>;

const LabelList: LabelList = (props) => {
  // recharts에서 사용되는 내부 컴포넌트로 타입만 정의하고 구현은 생략
  return null;
};
