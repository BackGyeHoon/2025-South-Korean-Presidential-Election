import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CANDIDATES } from "../data/candidates";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  LabelListProps,
  Cell,
} from "recharts";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import candidates from '../data/candidates.json';

// 자산 가격 추정 참고 사항
const ASSET_PRICE_NOTE = "※ 자산 추정 가격은 KB부동산 시세 및 국토교통부 실거래가 공개시스템의 최근 거래가격 또는 평균 매물가를 기준으로 합니다.";

// Candidate 타입 확장
type Candidate = typeof CANDIDATES[0] & {
  assets?: {
    totalAssets: number | string;
    housing?: {
      count: number;
      ownership: string;
      location: string;
      name: string;
      type: string;
      note?: string;
    };
    mainAssets?: string;
    source: string;
  };
  imageUrl?: string;
};

// 재산 내역 데이터 타입 정의
type CandidateAsset = {
  id: string;
  name: string;
  party: string;
  totalAssets: number | string;
  housing?: {
    count: number;
    ownership: string;
    location: string;
    name: string;
    type: string;
    note?: string;
    estimatedPrice?: number;
  };
  mainAssets?: string;
  source: string;
  color: string;
  imageUrl?: string;
};

// 차트 데이터 타입
type ChartDataType = {
  id: string;
  name: string;
  party: string;
  totalAssets: number;
  color: string;
};

// 커스텀 토글 스위치 컴포넌트
const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: () => void;
  color: string;
  size?: "sm" | "md";
}> = ({ checked, onChange, color, size = "md" }) => {
  const sizeClass =
    size === "sm"
      ? "w-8 h-4 after:w-3 after:h-3 after:top-[2px] after:left-[2px] after:translate-x-4"
      : "w-11 h-6 after:w-5 after:h-5 after:top-[2px] after:left-[2px] after:translate-x-5";

  return (
    <div className="inline-flex items-center">
      <label className="relative inline-flex cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`${sizeClass} bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:bg-white after:rounded-full after:transition-all peer-checked:bg-opacity-90 transition-colors`}
          style={{ backgroundColor: checked ? color : "" }}
        ></div>
      </label>
    </div>
  );
};

// 예산 비교 컴포넌트
const AssetsComparisonInline: React.FC<{
  candidateA: CandidateAsset;
  candidateB: CandidateAsset;
}> = ({ candidateA, candidateB }) => {
  // 두 후보 중 더 부유한 후보의 자산으로 나누어 비율 계산
  const wealthRatio = Math.max(
    (typeof candidateA.totalAssets === 'number' ? candidateA.totalAssets : 0) / 
    (typeof candidateB.totalAssets === 'number' ? candidateB.totalAssets : 1),
    
    (typeof candidateB.totalAssets === 'number' ? candidateB.totalAssets : 0) / 
    (typeof candidateA.totalAssets === 'number' ? candidateA.totalAssets : 1)
  ).toFixed(1);

  // 두 후보 중 더 부유한 쪽을 식별
  const richerCandidate =
    (typeof candidateA.totalAssets === 'number' && typeof candidateB.totalAssets === 'number' && 
     candidateA.totalAssets > candidateB.totalAssets) || 
    (typeof candidateA.totalAssets === 'number' && typeof candidateB.totalAssets !== 'number')
      ? candidateA 
      : candidateB;
      
  const poorerCandidate =
    (typeof candidateA.totalAssets === 'number' && typeof candidateB.totalAssets === 'number' && 
     candidateA.totalAssets > candidateB.totalAssets) || 
    (typeof candidateA.totalAssets === 'number' && typeof candidateB.totalAssets !== 'number')
      ? candidateB 
      : candidateA;

  // 비율 계산(0-100%)
  const calculatePercentage = (candidate: CandidateAsset) => {
    const maxAssets = Math.max(
      typeof candidateA.totalAssets === 'number' ? candidateA.totalAssets : 0, 
      typeof candidateB.totalAssets === 'number' ? candidateB.totalAssets : 0
    );
    return (typeof candidate.totalAssets === 'number' ? candidate.totalAssets : 0) / (maxAssets || 1) * 100;
  };

  const percentageA = calculatePercentage(candidateA);
  const percentageB = calculatePercentage(candidateB);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">
        {candidateA.name} vs {candidateB.name}
      </h3>
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-indigo-600">
          {wealthRatio}배
        </span>
        <p className="text-gray-600 mt-1">
          {richerCandidate.name}님은 {poorerCandidate.name}님보다 {wealthRatio}
          배 더 부유합니다
        </p>
      </div>

      <div className="space-y-6">
        {/* 첫 번째 후보 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: candidateA.color }}
              ></div>
              <span className="font-medium">{candidateA.name}</span>
            </div>
            <span className="font-semibold">
              {typeof candidateA.totalAssets === 'number' ? 
                (candidateA.totalAssets / 100).toFixed(0) : 
                String(candidateA.totalAssets)}억원
            </span>
          </div>
          <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${percentageA}%`,
                backgroundColor: candidateA.color,
              }}
            ></div>
          </div>
        </div>

        {/* 두 번째 후보 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: candidateB.color }}
              ></div>
              <span className="font-medium">{candidateB.name}</span>
            </div>
            <span className="font-semibold">
              {typeof candidateB.totalAssets === 'number' ? 
                (candidateB.totalAssets / 100).toFixed(0) : 
                String(candidateB.totalAssets)}억원
            </span>
          </div>
          <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${percentageB}%`,
                backgroundColor: candidateB.color,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 후보 카드 컴포넌트
interface CandidateCardProps {
  candidate: CandidateAsset;
  isSelected: boolean;
  onClick: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, isSelected, onClick }) => {
  return (
    <div 
      className={`candidate-card ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      <img 
        src={candidate.imageUrl || '/images/placeholder.png'} 
        alt={candidate.name} 
        className="candidate-card-image" 
      />
      <h3 className="candidate-card-name">{candidate.name}</h3>
      <p className="candidate-card-party">{candidate.party}</p>
      <p className="candidate-card-assets">
        {candidate.totalAssets ? `총자산: ${Number(candidate.totalAssets).toLocaleString()}백만원` : '자산정보 없음'}
      </p>
    </div>
  );
};

// 후보 가로 스크롤 컴포넌트
interface CandidateScrollViewProps {
  candidates: CandidateAsset[];
  selectedIds: string[];
  onSelectCandidate: (id: string) => void;
}

const CandidateScrollView: React.FC<CandidateScrollViewProps> = ({ candidates, selectedIds, onSelectCandidate }) => {
  return (
    <div className="candidate-scroll-section">
      <h2>후보자 목록</h2>
      <div className="candidate-scroll-container hide-scrollbar">
        <div className="candidate-scroll-inner">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedIds.includes(candidate.id)}
              onClick={() => onSelectCandidate(candidate.id)}
            />
          ))}
        </div>
        <div className="scroll-hint" />
      </div>
    </div>
  );
};

const CandidateAssetsPage: React.FC = () => {
  // 화면 크기 상태 관리
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // 후보자 선택 상태 관리
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  // 모든 후보자 선택 상태
  const [selectAll, setSelectAll] = useState<boolean>(true);

  // 활성 비교 후보 (상세 비교용)
  const [activeComparison, setActiveComparison] = useState<string | null>(null);

  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 자산 필터링 상태 (0: 모두, 1: 100억 이상, 2: 50억 이상, 3: 30억 이상)
  const [assetFilter, setAssetFilter] = useState<number>(0);

  // 드롭다운 상태 관리
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // 화면 크기 변경을 감지하는 이벤트 리스너 등록
  useEffect(() => {
    // 초기 화면 크기 확인
    setIsMobile(window.innerWidth < 640);

    // 화면 크기 변경 이벤트 핸들러
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('asset-filter-dropdown');
      const button = document.getElementById('asset-filter-button');
      
      if (dropdown && !dropdown.contains(event.target as Node) && 
          button && !button.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 전역 스타일 적용
  useEffect(() => {
    const css = `
      body {
        overscroll-behavior-x: none;
        padding-bottom: 60px; /* 바닥 네비게이션 공간 확보 */
      }
      
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      @media (max-width: 640px) {
        .candidate-scroll-container {
          margin: 0 -1rem;
          padding: 0 1rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .candidate-scroll-inner {
          display: flex;
          gap: 0.75rem;
          padding-bottom: 0.5rem;
        }
        .candidate-card {
          flex-shrink: 0;
          width: 210px;
        }
        .mobile-fixed-bottom {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background-color: white;
          border-top: 1px solid #e5e7eb;
          box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 0.75rem 1rem;
          transition: transform 0.3s ease;
        }
        body {
          padding-bottom: 10rem;
        }
      }

      .candidate-scroll-container {
        overflow-x: auto;
        white-space: nowrap;
        padding: 8px 16px;
        margin: 0 -16px;
        -webkit-overflow-scrolling: touch;
      }

      .candidate-scroll-inner {
        display: inline-flex;
        gap: 12px;
        padding-right: 24px;
      }

      .candidate-card {
        width: 220px;
        display: inline-block;
        white-space: normal;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 12px;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: all 0.2s ease;
        cursor: pointer;
        position: relative;
      }

      .candidate-card.selected {
        border-color: #1a73e8;
        box-shadow: 0 4px 8px rgba(26, 115, 232, 0.2);
      }

      .candidate-card-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 8px;
        background-color: #f5f5f5;
      }

      .candidate-card-name {
        font-weight: 600;
        font-size: 16px;
        margin: 0 0 4px;
      }

      .candidate-card-party {
        font-size: 12px;
        color: #606060;
        margin: 0 0 8px;
      }

      .candidate-card-assets {
        font-size: 14px;
        font-weight: 500;
        margin: 0;
      }

      .empty-search-result {
        padding: 20px;
        text-align: center;
        color: #606060;
      }

      .scroll-hint {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 36px;
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%);
        pointer-events: none;
        opacity: 0.8;
      }
    `;
    
    // 스크롤바 숨김 및 스크롤 동작 스타일 추가
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);

    // 언마운트 시 스타일 제거
    return () => {
      head.removeChild(style);
    };
  }, []);

  // 재산 내역 데이터를 candidates.json에서 가져옴
  const assetsData: CandidateAsset[] = useMemo(
    () =>
      (CANDIDATES as Candidate[])
        .filter(candidate => candidate.assets)
        .map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          party: candidate.party,
          totalAssets: candidate.assets!.totalAssets,
          housing: candidate.assets!.housing,
          mainAssets: candidate.assets!.mainAssets,
          source: candidate.assets!.source,
          color: candidate.color,
          imageUrl: candidate.imageUrl,
        })),
    []
  );

  // 컴포넌트 마운트 시 모든 후보자 선택
  useEffect(() => {
    if (selectAll) {
      setSelectedCandidates(assetsData.map((item) => item.id));
    }
  }, [assetsData, selectAll]);

  // 재산 내역 데이터 정렬 (총액 기준 내림차순, 미공개 데이터는 하단에 표시)
  const sortedAssetsData = useMemo(() => {
    return [...assetsData].sort((a, b) => {
      // 숫자형과 문자열형 처리
      if (typeof a.totalAssets === 'number' && typeof b.totalAssets === 'number') {
        return b.totalAssets - a.totalAssets;
      } else if (typeof a.totalAssets === 'number') {
        return -1; // a가 숫자면 a가 앞으로
      } else if (typeof b.totalAssets === 'number') {
        return 1; // b가 숫자면 b가 앞으로
      } else {
        return 0; // 둘 다 문자열이면 순서 유지
      }
    });
  }, [assetsData]);

  // 필터링된 후보자 데이터 (검색어 + 자산 필터)
  const filteredCandidates = useMemo(() => {
    let filtered = sortedAssetsData;
    
    // 검색어로 필터링
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        candidate =>
          candidate.name.toLowerCase().includes(query) ||
          candidate.party.toLowerCase().includes(query)
      );
    }
    
    // 자산 규모로 필터링
    if (assetFilter > 0) {
      filtered = filtered.filter(candidate => {
        if (typeof candidate.totalAssets !== 'number') return false;
        
        switch (assetFilter) {
          case 1: // 100억 이상
            return candidate.totalAssets >= 10000;
          case 2: // 50억 이상
            return candidate.totalAssets >= 5000;
          case 3: // 30억 이상
            return candidate.totalAssets >= 3000;
          default:
            return true;
        }
      });
    }
    
    return filtered;
  }, [sortedAssetsData, searchQuery, assetFilter]);

  // 선택된 후보들만 필터링
  const filteredAssetsData = useMemo(() => {
    return filteredCandidates.filter((item) =>
      selectedCandidates.includes(item.id)
    );
  }, [filteredCandidates, selectedCandidates]);

  // 차트 데이터 포맷팅 (억 단위 변환, 숫자형 데이터만)
  const chartData: ChartDataType[] = useMemo(() => {
    return filteredAssetsData
      .filter(item => typeof item.totalAssets === 'number')
      .map((item) => ({
        id: item.id,
        name: item.name,
        party: item.party,
        totalAssets: Number(item.totalAssets) / 100, // 억 단위로 변환
        color: item.color,
      }));
  }, [filteredAssetsData]);

  // 후보자 정보 매핑
  const candidateMap = useMemo(() => {
    return CANDIDATES.reduce((acc, candidate) => {
      acc[candidate.id] = candidate;
      return acc;
    }, {} as Record<string, (typeof CANDIDATES)[0]>);
  }, []);

  // 선택 핸들러
  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidates((prev) => {
      if (prev.includes(candidateId)) {
        const newSelected = prev.filter((id) => id !== candidateId);
        setSelectAll(newSelected.length === assetsData.length);
        return newSelected;
      } else {
        const newSelected = [...prev, candidateId];
        setSelectAll(newSelected.length === assetsData.length);
        return newSelected;
      }
    });
  };

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(assetsData.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  // 재산 총액 표시 함수
  const displayTotalAssets = (totalAssets: number | string): string => {
    if (typeof totalAssets === 'number') {
      return `${new Intl.NumberFormat("ko-KR").format(totalAssets / 100)} 억원`;
    } else {
      return String(totalAssets);
    }
  }

  // 값 포맷팅을 위한 함수 (차트 레이블용)
  const formatValueForLabel = (value: number): string => {
    return displayTotalAssets(value);
  }

  // 수치가 너무 크거나 작을 때 라벨 표시 조정 함수
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    
    // 모바일에서는 축약된 형태로 표시
    if (isMobile) {
      return (
        <text
          x={x + width + 5}
          y={y + 5}
          fill={chartData[index].color}
          textAnchor="start"
          fontWeight="bold"
          fontSize={10}
        >
          {`${(value).toFixed(0)}억`}
        </text>
      );
    }

    // 안철수 후보의 재산이 너무 커서 차트에서 라벨 위치 조정
    if (index === 0 && value > 1000) {
      return (
        <text
          x={x + width + 5}
          y={y + 5}
          fill={chartData[index].color}
          textAnchor="start"
          fontWeight="bold"
          fontSize={12}
        >
          {displayTotalAssets(value)}
        </text>
      );
    }

    return (
      <text
        x={x + width + 5}
        y={y + 5}
        fill={chartData[index].color}
        textAnchor="start"
        fontWeight="bold"
        fontSize={12}
      >
        {displayTotalAssets(value)}
      </text>
    );
  };

  // 특정 후보자의 상세 비교를 열거나 닫는 핸들러
  const toggleComparisonDetail = (candidateId: string) => {
    setActiveComparison((prev) => (prev === candidateId ? null : candidateId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
          후보자 재산내역
        </h1>
        <p className="text-center text-gray-600 mb-4">
          2025년 대선 출마 선언 주요 후보자들의 신고된 재산 현황입니다.
        </p>
        
        {/* 자산 가격 추정 방식 설명 */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 text-sm">
          <p className="font-medium text-blue-700 mb-1">자산 추정 가격 정보 안내</p>
          <p className="text-blue-600">
            표시된 부동산 추정 가격은 KB부동산과 국토교통부 실거래가 공개시스템의 최근 거래가격 또는 평균 매물가를 기준으로 작성되었습니다.
            실제 시장 가치와 차이가 있을 수 있으며, 참고용으로만 활용하시기 바랍니다.
          </p>
        </div>

        {/* 후보자 선택 섹션 - 데스크탑 */}
        <div className="hidden sm:block bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
            <h2 className="text-xl font-semibold">후보자 선택</h2>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-sm text-gray-600">
                {selectedCandidates.length}명 선택됨
              </span>
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
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
          </div>

          {/* 검색 및 필터 섹션 */}
          <div className="mb-4 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="후보자 또는 정당 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-shrink-0 relative">
              <div className="group">
                <button 
                  id="asset-filter-button"
                  className="flex items-center justify-between w-full text-left px-4 py-2 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-200 rounded-md text-indigo-700 font-medium"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>
                    {assetFilter === 0 && "모든 자산 규모"}
                    {assetFilter === 1 && "100억 이상"}
                    {assetFilter === 2 && "50억 이상"}
                    {assetFilter === 3 && "30억 이상"}
                  </span>
                  <svg className={`w-5 h-5 ml-2 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  id="asset-filter-dropdown" 
                  className={`absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition-opacity duration-200 ${dropdownOpen ? 'opacity-100' : 'opacity-0 invisible'}`}
                >
                  <div className="py-1">
                    {[
                      { value: 0, label: "모든 자산 규모" },
                      { value: 1, label: "100억 이상" },
                      { value: 2, label: "50억 이상" },
                      { value: 3, label: "30억 이상" }
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-indigo-50 ${assetFilter === option.value ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-700'}`}
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
            </div>
          </div>

          {/* 데스크탑용 그리드 카드 뷰 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedCandidates.includes(candidate.id) ? "shadow-md" : "shadow-sm"
                }`}
                style={{
                  backgroundColor: selectedCandidates.includes(candidate.id) ? `${candidate.color}10` : "white",
                  borderLeft: selectedCandidates.includes(candidate.id)
                    ? `4px solid ${candidate.color}`
                    : "4px solid transparent",
                }}
                onClick={() => handleCandidateSelect(candidate.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`relative w-14 h-14 rounded-full overflow-hidden transition-all flex-shrink-0 ${
                      selectedCandidates.includes(candidate.id)
                        ? "outline outline-2 outline-offset-2"
                        : "ring-1 ring-gray-200"
                    }`}
                    style={selectedCandidates.includes(candidate.id) ? { outlineColor: candidate.color } : undefined}
                  >
                    {candidateMap[candidate.id]?.image && (
                      <img
                        src={candidateMap[candidate.id].image}
                        alt={candidate.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                      style={{ backgroundColor: candidate.color }}
                    >
                      {selectedCandidates.includes(candidate.id) && (
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
                    <h3 className="font-semibold text-lg truncate">
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
                        {typeof candidate.totalAssets === 'number' 
                          ? `${(candidate.totalAssets / 100).toFixed(0)}억원`
                          : String(candidate.totalAssets)
                        }
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto flex-shrink-0">
                    <ToggleSwitch
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => handleCandidateSelect(candidate.id)}
                      color={candidate.color}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            ))}

            {filteredCandidates.length === 0 && (
              <div className="col-span-full flex items-center justify-center py-10">
                <p className="text-gray-500">검색 결과가 없습니다</p>
              </div>
            )}
          </div>
        </div>

        {/* 모바일용 가로 스크롤 카드 뷰 */}
        <div className="sm:hidden relative mb-4 overflow-hidden">
          <div className="candidate-scroll-container hide-scrollbar">
            <div className="candidate-scroll-inner">
              {filteredCandidates.map((candidate) => (
                <div 
                  key={candidate.id}
                  className={`candidate-card p-3 rounded-xl cursor-pointer transition-all ${
                    selectedCandidates.includes(candidate.id) ? "shadow-md" : "shadow-sm"
                  }`}
                  style={{
                    backgroundColor: selectedCandidates.includes(candidate.id) ? `${candidate.color}10` : "white",
                    borderLeft: selectedCandidates.includes(candidate.id)
                      ? `4px solid ${candidate.color}`
                      : "4px solid transparent",
                  }}
                  onClick={() => handleCandidateSelect(candidate.id)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`relative w-10 h-10 rounded-full overflow-hidden mb-1 ${
                        selectedCandidates.includes(candidate.id)
                          ? `ring-2 ring-offset-1 ring-[${candidate.color}]`
                          : "ring-1 ring-gray-200"
                      }`}
                    >
                      {candidateMap[candidate.id]?.image && (
                        <img
                          src={candidateMap[candidate.id].image}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">
                        {candidate.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span
                          className="px-1.5 py-0.5 text-xs rounded-full text-white flex-shrink-0"
                          style={{ backgroundColor: candidate.color }}
                        >
                          {candidate.party}
                        </span>
                        <span className="text-xs text-gray-600 truncate">
                          {typeof candidate.totalAssets === 'number' 
                            ? `${(candidate.totalAssets / 100).toFixed(0)}억원`
                            : String(candidate.totalAssets)
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredCandidates.length === 0 && (
                <div className="flex items-center justify-center w-full py-10 min-w-[280px]">
                  <p className="text-gray-500">검색 결과가 없습니다</p>
                </div>
              )}
            </div>
          </div>
          
          {/* 스크롤 힌트 표시기 */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

        {/* 그래프 섹션 - 숫자형 데이터가 있는 경우만 표시 */}
        {chartData.length > 0 && (
          <motion.div
            className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-6">후보자별 재산 비교</h2>
            {selectedCandidates.length === 0 || chartData.length === 0 ? (
              <div className="h-[300px] sm:h-[400px] w-full flex flex-col items-center justify-center text-gray-500 py-10">
                <svg
                  className="w-20 h-20 text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-lg mb-2">비교할 후보자를 선택해주세요</p>
                <p className="text-sm text-gray-400">
                  위에서 후보자를 선택하면 그래프가 표시됩니다
                </p>
              </div>
            ) : (
              <div className="h-[300px] sm:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={isMobile 
                      ? { top: 20, right: 60, left: 20, bottom: 20 } 
                      : { top: 20, right: 120, left: 60, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                    <XAxis
                      type="number"
                      domain={[0, "dataMax"]}
                      tickFormatter={(value: number) => `${value}억`}
                      tick={{ fill: "#666", fontSize: isMobile ? 10 : 12 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ 
                        fontSize: isMobile ? 10 : 14, 
                        fontWeight: "bold" 
                      }}
                      axisLine={false}
                      width={isMobile ? 40 : 80}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}억 원`, "재산총액"]}
                      labelFormatter={(value: string) => `${value} 후보`}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        padding: "10px",
                      }}
                    />
                    <Bar
                      dataKey="totalAssets"
                      name="재산 총액"
                      radius={[0, 6, 6, 0]}
                      maxBarSize={30}
                      barSize={isMobile ? 20 : 30}
                      animationDuration={800}
                    >
                      {/* 각 데이터 항목에 대해 Cell 컴포넌트를 사용하여 색상 적용 */}
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList
                        dataKey="totalAssets"
                        content={renderCustomizedLabel}
                        position="right"
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            <p className="text-right text-sm text-gray-500 mt-4">
              * 단위: 억 원, 재산 총액 기준 내림차순
            </p>
          </motion.div>
        )}

        {/* 표 섹션 */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 sm:mb-6">
            후보자 재산 상세 내역
          </h2>

          {/* 모바일용 카드 뷰 */}
          <div className="sm:hidden space-y-4">
            {sortedAssetsData.map((asset) => (
              <div
                key={`mobile-${asset.id}`}
                className={`p-4 rounded-lg transition-all border-l-4 ${
                  selectedCandidates.includes(asset.id)
                    ? "bg-gray-50"
                    : "border-l-transparent hover:border-l-gray-200 hover:bg-gray-50"
                }`}
                style={{
                  borderLeftColor: selectedCandidates.includes(asset.id)
                    ? asset.color
                    : "transparent",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {candidateMap[asset.id] && (
                      <img
                        src={candidateMap[asset.id].image}
                        alt={asset.name}
                        className="w-10 h-10 rounded-full object-cover border-2"
                        style={{ borderColor: asset.color }}
                      />
                    )}
                    <div>
                      <div className="font-semibold">{asset.name}</div>
                      <span
                        className="px-2 py-0.5 text-xs rounded-full text-white"
                        style={{ backgroundColor: asset.color }}
                      >
                        {asset.party}
                      </span>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={selectedCandidates.includes(asset.id)}
                    onChange={() => handleCandidateSelect(asset.id)}
                    color={asset.color}
                  />
                </div>
                <div className="flex flex-col gap-1 mt-3">
                  <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                    <span className="text-gray-600">신고 재산 총액</span>
                    <span className="font-medium">
                      {displayTotalAssets(asset.totalAssets)}
                    </span>
                  </div>
                  {asset.housing && (
                    <div className="flex flex-col text-sm border-b border-gray-100 py-2">
                      <span className="text-gray-600">주거 형태</span>
                      <span className="mt-1">
                        {asset.housing.type} {asset.housing.count}채 ({asset.housing.ownership})
                      </span>
                      <span className="mt-1">
                        {asset.housing.location} {asset.housing.name}
                      </span>
                      {asset.housing.note && (
                        <span className="mt-1 text-xs text-gray-500">
                          * {asset.housing.note}
                        </span>
                      )}
                    </div>
                  )}
                  {asset.mainAssets && (
                    <div className="flex flex-col text-sm border-b border-gray-100 py-2">
                      <span className="text-gray-600">주요 자산 구성</span>
                      <span className="mt-1">{asset.mainAssets}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-gray-600">출처</span>
                    <span className="text-gray-600">{asset.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 데스크탑용 테이블 뷰 */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left font-semibold border-b">
                    후보자명
                  </th>
                  <th className="p-3 text-left font-semibold border-b">
                    소속 정당
                  </th>
                  <th className="p-3 text-right font-semibold border-b">
                    신고 재산 총액
                  </th>
                  <th className="p-3 text-left font-semibold border-b">
                    주거 형태
                  </th>
                  <th className="p-3 text-left font-semibold border-b">출처</th>
                </tr>
              </thead>
              <tbody>
                {sortedAssetsData.map((asset) => (
                  <motion.tr
                    key={asset.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      selectedCandidates.includes(asset.id) ? "bg-blue-50" : ""
                    }`}
                    whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.5)" }}
                  >
                    <td className="p-3 border-b">
                      <div className="flex items-center gap-3">
                        <ToggleSwitch
                          checked={selectedCandidates.includes(asset.id)}
                          onChange={() => handleCandidateSelect(asset.id)}
                          color={asset.color}
                          size="sm"
                        />
                        {candidateMap[asset.id] && (
                          <img
                            src={candidateMap[asset.id].image}
                            alt={asset.name}
                            className="w-10 h-10 rounded-full object-cover"
                            style={{ border: `2px solid ${asset.color}` }}
                          />
                        )}
                        <span className="font-medium">{asset.name}</span>
                      </div>
                    </td>
                    <td className="p-3 border-b">
                      <span
                        className="px-2 py-1 text-xs rounded-full text-white inline-block"
                        style={{
                          backgroundColor: asset.color,
                        }}
                      >
                        {asset.party}
                      </span>
                    </td>
                    <td className="p-3 text-right border-b font-medium whitespace-nowrap">
                      {displayTotalAssets(asset.totalAssets)}
                    </td>
                    <td className="p-3 border-b text-sm">
                      {asset.housing ? (
                        <div>
                          <div>
                            {asset.housing.type} {asset.housing.count}채 ({asset.housing.ownership})
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {asset.housing.location} {asset.housing.name}
                          </div>
                          {asset.housing.note && (
                            <div className="text-xs text-gray-500 mt-1">
                              * {asset.housing.note}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="p-3 border-b text-sm text-gray-600">
                      {asset.source}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* 참고사항 섹션 */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-4 sm:p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4">참고사항</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>재산 내역은 후보자가 공개한 자료를 바탕으로 작성되었습니다.</li>
            <li>
              실제 재산과 차이가 있을 수 있으며, 선거관리위원회 공식 공개 시
              업데이트될 예정입니다.
            </li>
            <li>
              모든 후보자의 재산 내역이 포함되지 않았으며, 주요 후보자만
              표시됩니다.
            </li>
            <li>
              {ASSET_PRICE_NOTE}
            </li>
            <li>마지막 업데이트: 2025년 4월 기준</li>
          </ul>
        </motion.div>

        {/* 모바일용 하단 고정 선택 영역 */}
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
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
              <svg className={`w-3 h-3 ml-1 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                        <h4 className="font-semibold text-xs truncate w-full">{candidate.name}</h4>
                        <div className="flex flex-col items-center gap-1 mt-0.5">
                          <span
                            className="px-1 py-0.5 text-[9px] rounded-full text-white truncate max-w-full"
                            style={{ backgroundColor: candidate.color }}
                          >
                            {candidate.party}
                          </span>
                          <span className="text-[9px] text-gray-600 truncate max-w-full">
                            {typeof candidate.totalAssets === 'number' 
                              ? `${(candidate.totalAssets / 100).toFixed(0)}억원`
                              : String(candidate.totalAssets)
                            }
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
            className={`absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition-all duration-200 ${dropdownOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 invisible'} overflow-hidden`}
          >
            <div className="py-1">
              {[
                { value: 0, label: "모든 자산 규모" },
                { value: 1, label: "100억 이상" },
                { value: 2, label: "50억 이상" },
                { value: 3, label: "30억 이상" }
              ].map((option) => (
                <div
                  key={option.value}
                  className={`px-4 py-2 text-xs cursor-pointer hover:bg-indigo-50 ${assetFilter === option.value ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-700'}`}
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
      </motion.div>
    </div>
  );
};

export default CandidateAssetsPage;

