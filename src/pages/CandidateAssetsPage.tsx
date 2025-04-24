import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAssetsData } from "../hooks/useAssetsData";
import { CandidateCard } from "../components/assets/CandidateCard";
import { MobileCandidateCard } from "../components/assets/MobileCandidateCard";
import { MobileFixedBottomBar } from "../components/assets/MobileFixedBottomBar";
import { AssetTableHeader } from "../components/assets/AssetTableHeader";
import { AssetCard } from "../components/assets/AssetCard";
import AssetBarChart from "../components/assets/AssetBarChart";
import { AssetsSummary } from "../components/assets/AssetsSummary";
import AssetDetailCard from "../components/assets/AssetDetailCard";

const CandidateAssetsPage: React.FC = () => {
  const {
    sortedAssetsData,
    filteredAssetsData,
    chartData,
    candidateMap,
    selectedCandidates,
    selectAll,
    activeComparison,
    searchQuery,
    assetFilter,
    dropdownOpen,
    isMobile,
    handleCandidateSelect,
    handleSelectAll,
    toggleComparisonDetail,
    setSearchQuery,
    setAssetFilter,
    setDropdownOpen,
  } = useAssetsData();

  // 선택된 자산 정보
  const selectedAssets = sortedAssetsData.filter((asset) =>
    selectedCandidates.includes(asset.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 헤더 영역 */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            2025 대선 후보자 재산 비교
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            주요 대선 후보자들의 공개된 재산 내역을 확인하고 비교할 수 있습니다.
          </p>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 왼쪽 사이드바 - 후보자 선택 및 필터 */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* 필터 및 검색 영역 - overflow-visible로 변경하여 드롭다운이 잘리지 않도록 함 */}
              <div className="rounded-lg bg-white shadow overflow-visible">
                <AssetTableHeader
                  selectAll={selectAll}
                  handleSelectAll={handleSelectAll}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  assetFilter={assetFilter}
                  setAssetFilter={setAssetFilter}
                  dropdownOpen={dropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                />
              </div>

              {/* 후보자 카드 목록 (데스크톱) */}
              <div className="hidden space-y-4 sm:block">
                {filteredAssetsData.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    image={candidateMap[candidate.id]?.image}
                    isSelected={selectedCandidates.includes(candidate.id)}
                    onSelect={() => handleCandidateSelect(candidate.id)}
                  />
                ))}
                {filteredAssetsData.length === 0 && (
                  <div className="rounded-lg bg-white p-6 text-center shadow">
                    <p className="text-gray-500">검색 결과가 없습니다</p>
                  </div>
                )}
              </div>

              {/* 선택된 후보자 요약 정보 */}
              <AssetsSummary selectedAssets={selectedAssets} />
            </div>
          </div>

          {/* 오른쪽 메인 영역 - 차트 및 비교 */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* 바 차트 */}
              <AssetBarChart chartData={chartData} />

              {/* 선택된 후보자 상세 카드 */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {selectedAssets.map((asset) => (
                  <AssetDetailCard key={asset.id} asset={asset} />
                ))}
              </div>

              {/* 모바일에서만 보이는 후보자 카드 목록 */}
              <div className="sm:hidden">
                <h2 className="mb-4 text-lg font-medium text-gray-900">
                  후보자 목록
                </h2>
                <div className="space-y-3">
                  {filteredAssetsData.map((candidate) => (
                    <MobileCandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      candidateImage={candidateMap[candidate.id]?.image}
                      isSelected={selectedCandidates.includes(candidate.id)}
                      onSelect={() => handleCandidateSelect(candidate.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 모바일 하단 고정 바 */}
        <AnimatePresence>
          {isMobile && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 z-10 rounded-t-xl border-t bg-white px-4 py-3 shadow-lg"
            >
              <MobileFixedBottomBar
                selectedCandidates={selectedCandidates}
                filteredCandidates={filteredAssetsData}
                selectAll={selectAll}
                handleSelectAll={handleSelectAll}
                handleCandidateSelect={handleCandidateSelect}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                assetFilter={assetFilter}
                setAssetFilter={setAssetFilter}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
                candidateMap={candidateMap}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 푸터 */}
      <footer className="mt-12 border-t bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            이 데이터는 공개된 자료를 기반으로 작성되었으며, 실제 재산과 차이가
            있을 수 있습니다.
            <br />© 2023-2025 대선 후보자 자산 정보. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CandidateAssetsPage;
