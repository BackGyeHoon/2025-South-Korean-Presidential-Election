import React from "react";
import { motion } from "framer-motion";
import { AssetsChart } from "./AssetsChart";
import { ChartDataType } from "../../types/assets";

interface ChartSectionProps {
  chartData: ChartDataType[];
  selectedCandidates: string[];
}

export const ChartSection: React.FC<ChartSectionProps> = ({
  chartData,
  selectedCandidates,
}) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-6">후보자별 재산 비교</h2>
      <AssetsChart chartData={chartData} />
      <p className="text-right text-sm text-gray-500 mt-4">
        * 단위: 억 원, 재산 총액 기준 내림차순
      </p>
    </motion.div>
  );
};
