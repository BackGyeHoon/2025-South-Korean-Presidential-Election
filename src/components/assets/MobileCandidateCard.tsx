import React from "react";
import { CandidateAsset } from "../../types/assets";

interface MobileCandidateCardProps {
  candidate: CandidateAsset;
  isSelected: boolean;
  onSelect: () => void;
  candidateImage?: string;
}

export const MobileCandidateCard: React.FC<MobileCandidateCardProps> = ({
  candidate,
  isSelected,
  onSelect,
  candidateImage,
}) => {
  return (
    <div
      className={`candidate-card p-3 rounded-xl cursor-pointer transition-all ${
        isSelected ? "shadow-md" : "shadow-sm"
      }`}
      style={{
        backgroundColor: isSelected ? `${candidate.color}10` : "white",
        borderLeft: isSelected
          ? `4px solid ${candidate.color}`
          : "4px solid transparent",
      }}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2">
        <div
          className={`relative w-10 h-10 rounded-full overflow-hidden mb-1 ${
            isSelected
              ? `ring-2 ring-offset-1 ring-[${candidate.color}]`
              : "ring-1 ring-gray-200"
          }`}
        >
          {candidateImage && (
            <img
              src={candidateImage}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{candidate.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <span
              className="px-1.5 py-0.5 text-xs rounded-full text-white flex-shrink-0"
              style={{ backgroundColor: candidate.color }}
            >
              {candidate.party}
            </span>
            <span className="text-xs text-gray-600 truncate">
              {typeof candidate.totalAssets === "number"
                ? `${(candidate.totalAssets / 100).toFixed(0)}억원`
                : String(candidate.totalAssets)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
