import React from "react";
import { CandidateAsset } from "../../types/assets";
import candidateImages from "../../data/candidateImages";

interface CandidateSelectorProps {
  candidates: CandidateAsset[];
  selectedCandidates: string[];
  onSelectCandidate: (id: string) => void;
}

const CandidateSelector: React.FC<CandidateSelectorProps> = ({
  candidates,
  selectedCandidates,
  onSelectCandidate,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="mb-4 text-lg font-medium text-gray-900">후보자 선택</h3>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {candidates.map((candidate) => {
          const isSelected = selectedCandidates.includes(candidate.id);

          return (
            <div
              key={candidate.id}
              className={`
                cursor-pointer overflow-hidden rounded-lg border transition duration-200
                ${
                  isSelected
                    ? `border-2 border-${candidate.color} shadow-md`
                    : "border-gray-200"
                }
              `}
              onClick={() => onSelectCandidate(candidate.id)}
            >
              <div
                className="h-2"
                style={{ backgroundColor: candidate.color }}
              ></div>

              <div className="flex flex-col items-center p-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <img
                    src={
                      candidateImages[candidate.id] ||
                      "/images/default-profile.jpg"
                    }
                    alt={candidate.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/default-profile.jpg";
                    }}
                  />

                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                      <svg
                        className="h-8 w-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>

                <div className="mt-2 text-center">
                  <h4 className="font-medium text-gray-900">
                    {candidate.name}
                  </h4>
                  <p className="text-xs text-gray-500">{candidate.party}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateSelector;
