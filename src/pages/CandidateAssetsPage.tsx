import React, { useMemo, useState } from "react";
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

// 재산 내역 데이터 타입 정의
type CandidateAsset = {
  id: string;
  name: string;
  party: string;
  totalAssets: number;
  mainAssets: string;
  source: string;
  color: string;
};

// 차트 데이터 타입
type ChartDataType = CandidateAsset & {
  totalAssets: number;
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

// 후보자 카드 컴포넌트
const CandidateCard: React.FC<{
  candidate: CandidateAsset;
  image: string | undefined;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ candidate, image, isSelected, onSelect }) => {
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
              {(candidate.totalAssets / 100).toFixed(0)}억원
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

// 예산 비교 컴포넌트
const AssetsComparison: React.FC<{
  candidateA: CandidateAsset;
  candidateB: CandidateAsset;
}> = ({ candidateA, candidateB }) => {
  // 두 후보 중 더 부유한 후보의 자산으로 나누어 비율 계산
  const wealthRatio = Math.max(
    candidateA.totalAssets / candidateB.totalAssets,
    candidateB.totalAssets / candidateA.totalAssets
  ).toFixed(1);

  // 두 후보 중 더 부유한 쪽을 식별
  const richerCandidate =
    candidateA.totalAssets > candidateB.totalAssets ? candidateA : candidateB;
  const poorerCandidate =
    candidateA.totalAssets > candidateB.totalAssets ? candidateB : candidateA;

  // 비율 계산(0-100%)
  const calculatePercentage = (candidate: CandidateAsset) => {
    const maxAssets = Math.max(candidateA.totalAssets, candidateB.totalAssets);
    return (candidate.totalAssets / maxAssets) * 100;
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
              {(candidateA.totalAssets / 100).toFixed(0)}억원
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
              {(candidateB.totalAssets / 100).toFixed(0)}억원
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

const CandidateAssetsPage: React.FC = () => {
  // 후보자 선택 상태 관리
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  // 모든 후보자 선택 상태
  const [selectAll, setSelectAll] = useState<boolean>(true);

  // 활성 비교 후보 (상세 비교용)
  const [activeComparison, setActiveComparison] = useState<string | null>(null);

  // 재산 내역 데이터
  const assetsData: CandidateAsset[] = useMemo(
    () => [
      {
        id: "ahn-cheol-soo",
        name: "안철수",
        party: "국민의힘",
        totalAssets: 136799.82, // 단위: 백만원
        mainAssets:
          "안랩 주식 186만 주(약 1,231억 원), 예금 약 34억 원, 채권 약 29억 원 등",
        source: "아주경제",
        color: "#E61E2B",
      },
      {
        id: "hong-joon-pyo",
        name: "홍준표",
        party: "국민의힘",
        totalAssets: 4200, // 단위: 백만원
        mainAssets: "상세 내역 미공개",
        source: "아주경제",
        color: "#E61E2B",
      },
      {
        id: "kim-dong-yeon",
        name: "김동연",
        party: "더불어민주당",
        totalAssets: 3500, // 단위: 백만원
        mainAssets: "상세 내역 미공개",
        source: "아주경제",
        color: "#0050C9",
      },
      {
        id: "lee-jae-myung",
        name: "이재명",
        party: "더불어민주당",
        totalAssets: 3100, // 단위: 백만원
        mainAssets: "상세 내역 미공개",
        source: "아주경제",
        color: "#0050C9",
      },
    ],
    []
  );

  // 컴포넌트 마운트 시 모든 후보자 선택
  React.useEffect(() => {
    if (selectAll) {
      setSelectedCandidates(assetsData.map((item) => item.id));
    }
  }, [assetsData, selectAll]);

  // 재산 내역 데이터 정렬 (총액 기준 내림차순)
  const sortedAssetsData = useMemo(() => {
    return [...assetsData].sort((a, b) => b.totalAssets - a.totalAssets);
  }, [assetsData]);

  // 선택된 후보들만 필터링
  const filteredAssetsData = useMemo(() => {
    return sortedAssetsData.filter((item) =>
      selectedCandidates.includes(item.id)
    );
  }, [sortedAssetsData, selectedCandidates]);

  // 차트 데이터 포맷팅 (억 단위 변환)
  const chartData = useMemo(() => {
    return filteredAssetsData.map((item) => ({
      ...item,
      totalAssets: parseFloat((item.totalAssets / 100).toFixed(1)), // 억 단위로 변환 및 소수점 1자리
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

  // 억 단위로 포맷팅 함수
  const formatToKoreanCurrency = (value: number) => {
    return `${value.toLocaleString()}억 원`;
  };

  // 수치가 너무 크거나 작을 때 라벨 표시 조정 함수
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value, index } = props;

    // 안철수 후보의 재산이 너무 커서 차트에서 라벨 위치 조정
    if (index === 0 && value > 1000) {
      return (
        <text
          x={x + width + 5}
          y={y + 5}
          fill={chartData[index].color}
          textAnchor="start"
          fontWeight="bold"
        >
          {formatToKoreanCurrency(value)}
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
      >
        {formatToKoreanCurrency(value)}
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
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
          후보자 재산내역
        </h1>
        <p className="text-center text-gray-600 mb-8">
          2025년 대선 출마 선언 주요 후보자들의 신고된 재산 현황입니다.
        </p>

        {/* 후보자 선택 섹션 */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sortedAssetsData.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                image={candidateMap[candidate.id]?.image}
                isSelected={selectedCandidates.includes(candidate.id)}
                onSelect={() => handleCandidateSelect(candidate.id)}
              />
            ))}
          </div>
        </div>

        {/* 그래프 섹션 */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6">후보자별 재산 비교</h2>
          {selectedCandidates.length === 0 ? (
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
                  margin={{ top: 20, right: 120, left: 60, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis
                    type="number"
                    domain={[0, "dataMax"]}
                    tickFormatter={(value: number) => `${value}억`}
                    tick={{ fill: "#666" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 14, fontWeight: "bold" }}
                    axisLine={false}
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
                    barSize={30}
                    animationDuration={800}
                  >
                    {/* 각 데이터 항목에 대해 Cell 컴포넌트를 사용하여 색상 적용 */}
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="totalAssets"
                      content={renderCustomizedLabel}
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

        {/* 후보자 간 재산 차이 표시 섹션 */}
        <AnimatePresence>
          {selectedCandidates.length > 1 && (
            <motion.div
              className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-6">
                후보자 간 재산 차이
              </h2>
              <div className="space-y-4">
                {filteredAssetsData.slice(0, -1).map((candidate, index) => {
                  const nextCandidate = filteredAssetsData[index + 1];
                  const difference =
                    candidate.totalAssets - nextCandidate.totalAssets;
                  const differenceInBillion = difference / 100;
                  const ratio =
                    candidate.totalAssets / nextCandidate.totalAssets;
                  const isActive = activeComparison === candidate.id;

                  return (
                    <motion.div
                      key={`diff-${candidate.id}-${nextCandidate.id}`}
                      className={`p-4 rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? "bg-gray-50 shadow-sm"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => toggleComparisonDetail(candidate.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-1 sm:gap-3">
                          <div className="flex items-center sm:flex-row gap-1 sm:gap-3">
                            <div className="flex items-center gap-1">
                              <div
                                className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shrink-0"
                                style={{ backgroundColor: candidate.color }}
                              >
                                {candidateMap[candidate.id] && (
                                  <img
                                    src={candidateMap[candidate.id].image}
                                    alt={candidate.name}
                                    className="w-full h-full object-cover mix-blend-luminosity opacity-70"
                                  />
                                )}
                              </div>
                              <span className="font-medium whitespace-nowrap">
                                {candidate.name}
                              </span>
                            </div>
                            <span className="mx-1 hidden sm:block">vs</span>
                            <div className="flex items-center gap-1">
                              <div
                                className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shrink-0"
                                style={{ backgroundColor: nextCandidate.color }}
                              >
                                {candidateMap[nextCandidate.id] && (
                                  <img
                                    src={candidateMap[nextCandidate.id].image}
                                    alt={nextCandidate.name}
                                    className="w-full h-full object-cover mix-blend-luminosity opacity-70"
                                  />
                                )}
                              </div>
                              <span className="font-medium whitespace-nowrap">
                                {nextCandidate.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <div className="text-sm font-semibold px-3 py-1 rounded-full bg-gray-100">
                            {ratio.toFixed(1)}배
                          </div>
                          <svg
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              isActive ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* 항상 보이는 진행 바 - 디자인 개선 */}
                      <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden mb-6">
                        {/* 첫 번째 후보자(더 많은 재산) 바 */}
                        <div className="relative h-10 mb-2">
                          <div
                            className="h-full rounded-lg absolute top-0 left-0 flex items-center pl-3"
                            style={{
                              width: `${
                                (candidate.totalAssets /
                                  filteredAssetsData[0].totalAssets) *
                                100
                              }%`,
                              backgroundColor: `${candidate.color}aa`,
                              minWidth: "60px",
                            }}
                          >
                            <div className="flex items-center gap-1">
                              <div
                                className="w-5 h-5 rounded-full overflow-hidden border-2 border-white shrink-0"
                                style={{ backgroundColor: candidate.color }}
                              >
                                {candidateMap[candidate.id] && (
                                  <img
                                    src={candidateMap[candidate.id].image}
                                    alt={candidate.name}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <span className="text-xs font-semibold text-white drop-shadow-sm">
                                {new Intl.NumberFormat("ko-KR").format(
                                  candidate.totalAssets / 100
                                )}
                                억원
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 두 번째 후보자 바 */}
                        <div className="relative h-10">
                          <div
                            className="h-full rounded-lg absolute top-0 left-0 flex items-center pl-3"
                            style={{
                              width: `${
                                (nextCandidate.totalAssets /
                                  filteredAssetsData[0].totalAssets) *
                                100
                              }%`,
                              backgroundColor: `${nextCandidate.color}aa`,
                              minWidth: "60px",
                            }}
                          >
                            <div className="flex items-center gap-1">
                              <div
                                className="w-5 h-5 rounded-full overflow-hidden border-2 border-white shrink-0"
                                style={{ backgroundColor: nextCandidate.color }}
                              >
                                {candidateMap[nextCandidate.id] && (
                                  <img
                                    src={candidateMap[nextCandidate.id].image}
                                    alt={nextCandidate.name}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <span className="text-xs font-semibold text-white drop-shadow-sm whitespace-nowrap">
                                {new Intl.NumberFormat("ko-KR").format(
                                  nextCandidate.totalAssets / 100
                                )}
                                억원
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm font-medium">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">
                            {ratio.toFixed(1)}
                          </span>
                          <span className="text-gray-600">배 차이</span>
                        </div>
                        <div>
                          <span className="text-gray-900">차이: </span>
                          <span className="text-red-600">
                            {new Intl.NumberFormat("ko-KR").format(
                              differenceInBillion
                            )}{" "}
                            억원
                          </span>
                        </div>
                      </div>

                      {/* 상세 정보 (토글되는 영역) */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-gray-100"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: candidate.color }}
                                  ></div>
                                  {candidate.name} 주요 자산
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {candidate.mainAssets}
                                </p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                      backgroundColor: nextCandidate.color,
                                    }}
                                  ></div>
                                  {nextCandidate.name} 주요 자산
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {nextCandidate.mainAssets}
                                </p>
                              </div>
                            </div>
                            <div className="bg-indigo-50 p-3 rounded-lg mt-2">
                              <div className="font-medium text-sm mb-1">
                                비교 분석
                              </div>
                              <p className="text-sm text-gray-600">
                                {candidate.name} 후보는 {nextCandidate.name}{" "}
                                후보보다 약 {ratio.toFixed(1)}배 많은 재산을
                                보유하고 있으며, 그 차이는{" "}
                                {new Intl.NumberFormat("ko-KR").format(
                                  differenceInBillion
                                )}{" "}
                                억원입니다.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                      {new Intl.NumberFormat("ko-KR").format(asset.totalAssets)}{" "}
                      백만원
                    </span>
                  </div>
                  <div className="flex flex-col text-sm border-b border-gray-100 py-2">
                    <span className="text-gray-600">주요 자산 구성</span>
                    <span className="mt-1">{asset.mainAssets}</span>
                  </div>
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
                    주요 자산 구성
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
                      {new Intl.NumberFormat("ko-KR").format(asset.totalAssets)}{" "}
                      백만원
                    </td>
                    <td className="p-3 border-b text-sm max-w-xs truncate">
                      <div className="max-w-xs truncate">
                        {asset.mainAssets}
                      </div>
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
            <li>마지막 업데이트: 2025년 4월 기준</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CandidateAssetsPage;
