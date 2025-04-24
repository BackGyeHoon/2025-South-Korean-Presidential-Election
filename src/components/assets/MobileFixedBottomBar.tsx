import React from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import { CandidateAsset } from "../../types/assets";

interface MobileFixedBottomBarProps {
  selectedCandidates: string[];
  filteredCandidates: CandidateAsset[];
  selectAll: boolean;
  handleSelectAll: () => void;
  handleCandidateSelect: (candidateId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  assetFilter: number;
  setAssetFilter: (filter: number) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  candidateMap: Record<string, { image: string }>;
}

export const MobileFixedBottomBar: React.FC<MobileFixedBottomBarProps> = ({
  selectedCandidates,
  filteredCandidates,
  selectAll,
  handleSelectAll,
  handleCandidateSelect,
  searchQuery,
  setSearchQuery,
  assetFilter,
  setAssetFilter,
  dropdownOpen,
  setDropdownOpen,
  candidateMap,
}) => {
  return (
    <div className="sm:hidden mobile-fixed-bottom">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700">
          {selectedCandidates.length}명 선택됨
        </span>
        <button
          onClick={handleSelectAll}
          className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        >
          <ToggleSwitch
            checked={selectAll}
            onChange={handleSelectAll}
            color="#6366f1"
            size="sm"
          />
          <span>{selectAll ? "전체 해제" : "전체 선택"}</span>
        </button>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            placeholder="후보자 또는 정당 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="flex items-center justify-between text-left px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-200 rounded-md text-indigo-700 text-xs font-medium whitespace-nowrap"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>
            {assetFilter === 0 && "모든 자산"}
            {assetFilter === 1 && "100억↑"}
            {assetFilter === 2 && "50억↑"}
            {assetFilter === 3 && "30억↑"}
          </span>
          <svg
            className={`w-3 h-3 ml-1 transition-transform duration-200 ${
              dropdownOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* 후보자 카드 목록 */}
      <div className="overflow-y-auto max-h-[200px] pb-1 bg-gray-50 rounded-md border border-gray-200">
        {filteredCandidates.length === 0 ? (
          <div className="flex items-center justify-center py-4">
            <p className="text-gray-500 text-xs">검색 결과가 없습니다</p>
          </div>
        ) : (
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 p-2 min-w-fit">
              {filteredCandidates.map((candidate) => (
                <div
                  key={`mobile-fixed-${candidate.id}`}
                  className={`flex-shrink-0 w-[120px] bg-white rounded-lg p-2 shadow-sm border transition-all ${
                    selectedCandidates.includes(candidate.id)
                      ? "border-transparent"
                      : "border-gray-200"
                  }`}
                  style={{
                    borderLeft: selectedCandidates.includes(candidate.id)
                      ? `3px solid ${candidate.color}`
                      : "3px solid transparent",
                  }}
                  onClick={() => handleCandidateSelect(candidate.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`relative w-10 h-10 rounded-full overflow-hidden mb-1 ${
                        selectedCandidates.includes(candidate.id)
                          ? "outline outline-2 outline-offset-1"
                          : "ring-1 ring-gray-200"
                      }`}
                      style={
                        selectedCandidates.includes(candidate.id)
                          ? { outlineColor: candidate.color }
                          : undefined
                      }
                    >
                      {candidateMap[candidate.id]?.image && (
                        <img
                          src={candidateMap[candidate.id].image}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div
                        className="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white flex items-center justify-center"
                        style={{ backgroundColor: candidate.color }}
                      >
                        {selectedCandidates.includes(candidate.id) && (
                          <svg
                            className="w-1.5 h-1.5 text-white"
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
                    <h4 className="font-semibold text-xs truncate w-full">
                      {candidate.name}
                    </h4>
                    <div className="flex flex-col items-center gap-1 mt-0.5">
                      <span
                        className="px-1 py-0.5 text-[9px] rounded-full text-white truncate max-w-full"
                        style={{ backgroundColor: candidate.color }}
                      >
                        {candidate.party}
                      </span>
                      <span className="text-[9px] text-gray-600 truncate max-w-full">
                        {typeof candidate.totalAssets === "number"
                          ? `${(candidate.totalAssets / 100).toFixed(0)}억원`
                          : String(candidate.totalAssets)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 드롭다운 */}
      <div
        className={`absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition-all duration-200 ${
          dropdownOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 invisible"
        } overflow-hidden`}
      >
        <div className="py-1">
          {[
            { value: 0, label: "모든 자산 규모" },
            { value: 1, label: "100억 이상" },
            { value: 2, label: "50억 이상" },
            { value: 3, label: "30억 이상" },
          ].map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 text-xs cursor-pointer hover:bg-indigo-50 ${
                assetFilter === option.value
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-700"
              }`}
              onClick={() => {
                setAssetFilter(option.value);
                setDropdownOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
