import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AssetsDifferenceItem } from "./AssetsDifferenceItem";
import { CandidateAsset } from "../../types/assets";

interface AssetsDifferenceProps {
  filteredAssetsData: CandidateAsset[];
  activeComparison: string | null;
  toggleComparisonDetail: (candidateId: string) => void;
  candidateMap: Record<string, { image: string }>;
}

export const AssetsDifference: React.FC<AssetsDifferenceProps> = ({
  filteredAssetsData,
  activeComparison,
  toggleComparisonDetail,
  candidateMap,
}) => {
  if (filteredAssetsData.length <= 1) {
    return null;
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-6">후보자 간 재산 차이</h2>
      <div className="space-y-4">
        {filteredAssetsData.slice(0, -1).map((candidate, index) => {
          const nextCandidate = filteredAssetsData[index + 1];
          const isActive = activeComparison === candidate.id;

          return (
            <AssetsDifferenceItem
              key={`diff-${candidate.id}-${nextCandidate.id}`}
              candidate={candidate}
              nextCandidate={nextCandidate}
              isActive={isActive}
              activeComparison={activeComparison}
              toggleComparisonDetail={toggleComparisonDetail}
              candidateMap={candidateMap}
              filteredAssetsData={filteredAssetsData}
            />
          );
        })}
      </div>
    </motion.div>
  );
};
