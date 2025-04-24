import React from "react";
import { motion } from "framer-motion";
import { ToggleSwitch } from "./ToggleSwitch";
import { CandidateAsset } from "../../types/assets";

interface CandidateCardProps {
  candidate: CandidateAsset;
  image: string | undefined;
  isSelected: boolean;
  onSelect: () => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  image,
  isSelected,
  onSelect,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-4 rounded-xl cursor-pointer transition-all ${
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
      <div className="flex items-center gap-3">
        <div
          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden transition-all flex-shrink-0 ${
            isSelected
              ? "outline outline-2 outline-offset-2"
              : "ring-1 ring-gray-200"
          }`}
          style={isSelected ? { outlineColor: candidate.color } : undefined}
        >
          {image && (
            <img
              src={image}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          )}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
            style={{ backgroundColor: candidate.color }}
          >
            {isSelected && (
              <svg
                className="w-2 h-2 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base sm:text-lg truncate">
            {candidate.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="px-2 py-0.5 text-xs rounded-full text-white flex-shrink-0"
              style={{ backgroundColor: candidate.color }}
            >
              {candidate.party}
            </span>
            <span className="text-sm text-gray-600 truncate">
              {typeof candidate.totalAssets === "number"
                ? `${(candidate.totalAssets / 100).toFixed(0)}억원`
                : String(candidate.totalAssets)}
            </span>
          </div>
        </div>
        <div className="ml-auto flex-shrink-0">
          <ToggleSwitch
            checked={isSelected}
            onChange={onSelect}
            color={candidate.color}
            size="sm"
          />
        </div>
      </div>
    </motion.div>
  );
};
