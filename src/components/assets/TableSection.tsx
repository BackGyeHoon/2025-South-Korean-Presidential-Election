import React from "react";
import { motion } from "framer-motion";
import { AssetsTable } from "./AssetsTable";
import { CandidateAsset } from "../../types/assets";

interface TableSectionProps {
  sortedAssetsData: CandidateAsset[];
  selectedCandidates: string[];
  handleCandidateSelect: (candidateId: string) => void;
  candidateMap: Record<string, { image: string }>;
}

export const TableSection: React.FC<TableSectionProps> = ({
  sortedAssetsData,
  selectedCandidates,
  handleCandidateSelect,
  candidateMap,
}) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4 sm:mb-6">
        후보자 재산 상세 내역
      </h2>
      <AssetsTable
        sortedAssetsData={sortedAssetsData}
        selectedCandidates={selectedCandidates}
        handleCandidateSelect={handleCandidateSelect}
        candidateMap={candidateMap}
      />
    </motion.div>
  );
};
