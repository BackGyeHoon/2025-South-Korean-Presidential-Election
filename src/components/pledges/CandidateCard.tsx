import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Candidate } from "../../types/candidate";

export interface CandidateCardProps {
  candidate: Candidate;
  isSelected?: boolean;
  onSelect?: (candidate: Candidate) => void;
  showDetailLink?: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isSelected = false,
  onSelect,
  showDetailLink = true,
}) => {
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(candidate);
    }
  };

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center p-4 rounded-lg transition-all cursor-pointer",
        "border-2 hover:shadow-md",
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white hover:border-blue-300"
      )}
      onClick={handleCardClick}
    >
      <div className="w-24 h-24 mb-3 overflow-hidden rounded-full">
        <img
          src={candidate.image}
          alt={`${candidate.name} 사진`}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-bold mb-1">{candidate.name}</h3>
      <p className="text-sm text-gray-600 mb-3">{candidate.party}</p>

      {showDetailLink && (
        <Link
          to={`/candidates/${candidate.id}`}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
          onClick={handleDetailClick}
        >
          상세 정보
        </Link>
      )}
    </div>
  );
};

export default CandidateCard;
