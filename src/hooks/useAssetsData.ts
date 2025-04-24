import { useState, useMemo, useEffect } from "react";
import { CandidateAsset, ChartDataType } from "../types/assets";
import assetsData from "../data/assetsData";
import candidateImages from "../data/candidateImages";

// 배열을 랜덤하게 섞는 함수 (Fisher-Yates 알고리즘)
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// 자산값을 숫자로 변환하는 함수 (string이면 0으로 처리)
const ensureNumber = (value: string | number): number => {
  if (typeof value === "number") return value;
  if (value === "정보 없음" || value === "") return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

export const useAssetsData = () => {
  // 상태 관리
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeComparison, setActiveComparison] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [assetFilter, setAssetFilter] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 페이지 로드시 한 번만 생성되는 랜덤 시드값
  const [randomSeed] = useState(Math.random());

  // 모바일 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 데이터 정규화 (모든 자산 값을 숫자로 변환)
  const normalizedAssetsData = useMemo(() => {
    return assetsData.map((candidate: CandidateAsset) => ({
      ...candidate,
      totalAssets: ensureNumber(candidate.totalAssets),
    }));
  }, []);

  // 데이터 정렬 및 필터링
  const sortedAssetsData = useMemo(() => {
    return [...normalizedAssetsData].sort((a, b) => {
      // 이제 totalAssets는 항상 숫자이므로 타입 체크 필요 없음
      return b.totalAssets - a.totalAssets;
    });
  }, [normalizedAssetsData]);

  // 검색어 및 자산 필터 적용 후 랜덤 정렬
  const filteredAssetsData = useMemo(() => {
    // 먼저 필터링
    const filtered = sortedAssetsData.filter((candidate) => {
      // 검색어 필터
      const searchMatch =
        searchQuery === "" ||
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.party.toLowerCase().includes(searchQuery.toLowerCase());

      // 자산 금액 필터
      let assetMatch = true;
      if (assetFilter > 0) {
        const thresholds = [0, 10000, 5000, 3000]; // 없음, 100억, 50억, 30억
        // 이제 totalAssets는 항상 숫자이므로 타입 체크 필요 없음
        assetMatch = candidate.totalAssets >= thresholds[assetFilter];
      }

      return searchMatch && assetMatch;
    });

    // 그 다음 랜덤하게 섞기
    return shuffleArray(filtered);
  }, [sortedAssetsData, searchQuery, assetFilter, randomSeed]); // randomSeed를 의존성 배열에 추가하여 컴포넌트 마운트 시에만 랜덤 정렬

  // 차트 데이터 가공
  const chartData = useMemo(() => {
    return sortedAssetsData
      .filter((candidate) => selectedCandidates.includes(candidate.id))
      .map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
        party: candidate.party,
        totalAssets: candidate.totalAssets, // 이미 숫자로 변환됨
        color: candidate.color,
      })) as ChartDataType[];
  }, [sortedAssetsData, selectedCandidates]);

  // 이미지 데이터 매핑
  const candidateMap = useMemo(() => {
    return sortedAssetsData.reduce((acc, candidate) => {
      acc[candidate.id] = {
        image: candidateImages[candidate.id] || "",
      };
      return acc;
    }, {} as Record<string, { image: string }>);
  }, [sortedAssetsData]);

  // 후보자 선택 핸들러
  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidates((prev) => {
      if (prev.includes(candidateId)) {
        return prev.filter((id) => id !== candidateId);
      } else {
        return [...prev, candidateId];
      }
    });
  };

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(
        filteredAssetsData.map((candidate) => candidate.id)
      );
    }
    setSelectAll(!selectAll);
  };

  // 비교 상세 토글 핸들러
  const toggleComparisonDetail = (comparisonId: string | null) => {
    setActiveComparison(
      activeComparison === comparisonId ? null : comparisonId
    );
  };

  // 선택된 후보자 수에 따라 전체 선택 상태 업데이트
  useEffect(() => {
    if (filteredAssetsData.length > 0) {
      setSelectAll(
        selectedCandidates.length === filteredAssetsData.length &&
          selectedCandidates.length > 0
      );
    } else {
      setSelectAll(false);
    }
  }, [selectedCandidates, filteredAssetsData]);

  return {
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
  };
};
