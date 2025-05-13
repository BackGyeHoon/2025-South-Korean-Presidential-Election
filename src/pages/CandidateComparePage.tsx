import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CANDIDATES, Candidate, Category, Pledge } from "../data/candidates";

const CandidateComparePage = () => {
  // 선택된 후보자들의 ID를 저장
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  // 랜덤으로 정렬된 후보자 목록
  const [randomizedCandidates, setRandomizedCandidates] = useState<
    typeof CANDIDATES
  >([]);

  // 비교 모드: 'common' (공통 공약) 또는 'difference' (차이점)
  const [compareMode, setCompareMode] = useState<"common" | "difference">(
    "common"
  );

  // 선택된 정책 카테고리 (예: 경제, 복지, 교육 등)
  const [selectedCategory, setSelectedCategory] = useState("economy");

  // 두 번째 후보자 선택 시 확인 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidateToConfirm, setCandidateToConfirm] = useState<string | null>(
    null
  );

  // 비교 결과 모달 상태
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // 추가 후보자 선택 중 상태
  const [selectingAdditional, setSelectingAdditional] = useState(false);

  // 컴포넌트 마운트 시 후보자 순서를 랜덤으로 섞음
  useEffect(() => {
    const shuffled = [...CANDIDATES].sort(() => 0.5 - Math.random());
    setRandomizedCandidates(shuffled);
  }, []);

  // 선택된 후보자가 2명 이상일 때 자동으로 모달 열기
  useEffect(() => {
    if (selectedCandidates.length >= 2 && !selectingAdditional) {
      setIsCompareModalOpen(true);
    }
  }, [selectedCandidates, selectingAdditional]);

  // 모든 카테고리 목록
  const categories = CANDIDATES[0].categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
  }));

  // 후보자 선택/해제 토글 함수
  const toggleCandidateSelection = (candidateId: string) => {
    const isSelected = selectedCandidates.includes(candidateId);

    if (isSelected) {
      setSelectedCandidates(
        selectedCandidates.filter((id) => id !== candidateId)
      );
    } else {
      if (selectedCandidates.length === 1 && !selectingAdditional) {
        // 두 번째 후보 선택 시 모달 열기 (단, 추가 선택 모드가 아닌 경우)
        setCandidateToConfirm(candidateId);
        setIsModalOpen(true);
      } else if (selectedCandidates.length < 3) {
        // 첫 번째 또는 세 번째 후보 선택 시 바로 추가
        setSelectedCandidates([...selectedCandidates, candidateId]);

        // 세 번째 후보자를 선택하면 추가 선택 모드 비활성화
        if (selectedCandidates.length === 2 && selectingAdditional) {
          setSelectingAdditional(false);
        }
      } else {
        // 이미 3명 선택됨 (선입선출)
        setSelectedCandidates([...selectedCandidates.slice(1), candidateId]);
      }
    }
  };

  // 두 명만 비교하기 선택 시
  const handleCompareTwoCandidates = () => {
    if (candidateToConfirm) {
      setSelectedCandidates([selectedCandidates[0], candidateToConfirm]);
      setIsModalOpen(false);
      setCandidateToConfirm(null);
      setSelectingAdditional(false); // 선택 추가 모드 아님
    }
  };

  // 세 명 비교하기 선택 시
  const handleCompareThreeCandidates = () => {
    if (candidateToConfirm) {
      setSelectedCandidates([...selectedCandidates, candidateToConfirm]);
      setIsModalOpen(false);
      setCandidateToConfirm(null);
      setSelectingAdditional(true); // 선택 추가 모드 활성화
    }
  };

  // 모달 취소 시
  const handleCancelModal = () => {
    setIsModalOpen(false);
    setCandidateToConfirm(null);
  };

  // 선택된 후보자 정보 가져오기
  const getSelectedCandidatesData = () => {
    return selectedCandidates
      .map((id) => CANDIDATES.find((c) => c.id === id))
      .filter(Boolean) as typeof CANDIDATES;
  };

  // 특정 카테고리에서 선택된 후보자들의 공약을 비교하여 공통점/차이점 찾기
  const comparePledges = (categoryId: string) => {
    const selectedCandidatesData = getSelectedCandidatesData();

    if (selectedCandidatesData.length < 2) return [];

    // 모든 공약 ID를 수집
    const allPledgeIds = new Set<string>();
    selectedCandidatesData.forEach((candidate) => {
      const category = candidate.categories.find(
        (cat) => cat.id === categoryId
      );
      if (category) {
        category.pledges.forEach((pledge) => {
          allPledgeIds.add(pledge.id);
        });
      }
    });

    // 각 공약 ID에 대해 공약 비교 정보 생성
    const comparisonResult = Array.from(allPledgeIds)
      .map((pledgeId) => {
        // 선택된 모든 후보의 해당 공약 찾기
        const pledgesByCandidate = selectedCandidatesData.map((candidate) => {
          const category = candidate.categories.find(
            (cat) => cat.id === categoryId
          );
          return {
            candidate,
            pledge: category?.pledges.find((p) => p.id === pledgeId) || null,
          };
        });

        // 해당 공약이 있는 후보와 없는 후보 분류
        const candidatesWithPledge = pledgesByCandidate.filter(
          (item) => item.pledge !== null
        );
        const candidatesWithoutPledge = pledgesByCandidate.filter(
          (item) => item.pledge === null
        );

        // 공통 공약인지 여부 (모든 후보가 이 공약을 가지고 있으면 공통 공약)
        const isCommon =
          candidatesWithPledge.length === selectedCandidatesData.length;

        // 이 공약을 가진 후보가 1명 이상일 때만 결과에 포함 (아무도 없는 공약은 표시하지 않음)
        if (candidatesWithPledge.length > 0) {
          // ID를 기반으로 기본 정보 가져오기 (첫 번째 후보의 공약 사용)
          const basePledge = candidatesWithPledge[0].pledge!;

          return {
            id: pledgeId,
            title: basePledge.title,
            isCommon,
            candidatesWithPledge,
            candidatesWithoutPledge,
          };
        }

        return null;
      })
      .filter(Boolean) as any[];

    // 비교 모드에 따라 필터링
    if (compareMode === "common") {
      return comparisonResult.filter((item) => item.isCommon);
    } else {
      return comparisonResult.filter((item) => !item.isCommon);
    }
  };

  // 후보자 카드 컴포넌트
  const CandidateCard = ({
    candidate,
    isSelected,
    onClick,
  }: {
    candidate: (typeof CANDIDATES)[number];
    isSelected: boolean;
    onClick: () => void;
  }) => {
    return (
      <div
        className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
          isSelected
            ? "border-2 shadow-md"
            : "border-gray-200 hover:border-gray-300"
        }`}
        style={{ borderColor: isSelected ? candidate.color : "" }}
        onClick={onClick}
      >
        <div className="h-2" style={{ backgroundColor: candidate.color }}></div>
        <div className="p-4">
          <div className="flex items-center">
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">{candidate.name}</h3>
              <p className="text-sm text-gray-600">{candidate.party}</p>

              {/* 단일화 정보 표시 */}
              {candidate.unification &&
                candidate.unification.isUnifiedCandidate &&
                candidate.unification.unifiedWith &&
                candidate.unification.unifiedWith.length > 0 && (
                  <div className="flex items-center mt-1 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mr-1"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    <div className="text-xs text-primary font-medium flex flex-wrap gap-1">
                      {candidate.unification.unifiedWith.map(
                        (unified: any, index: number) => (
                          <span key={index}>
                            {unified.name}({unified.party})
                            {index <
                            (candidate.unification?.unifiedWith?.length || 1) -
                              1
                              ? ", "
                              : ""}
                          </span>
                        )
                      )}
                      <span>단일화</span>
                    </div>
                  </div>
                )}

              <Link
                to={`/candidates/${candidate.id}`}
                className="mt-2 inline-block px-3 py-1 text-blue-600 text-sm hover:text-blue-800"
                onClick={(e) => e.stopPropagation()}
              >
                상세 정보
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 차이점/공통점 표시를 위한 공약 카드
  const PledgeComparisonCard = ({ item }: { item: any }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-medium text-lg">{item.title}</h3>
        </div>

        <div className="p-4">
          {/* 이 공약을 가진 후보들 */}
          {item.candidatesWithPledge.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-sm text-gray-600 mb-2">
                이 공약을 제시한 후보
              </h4>
              <div className="space-y-3">
                {item.candidatesWithPledge.map(({ candidate, pledge }: any) => (
                  <div
                    key={candidate.id}
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${candidate.color}15` }}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className="w-4 h-4 rounded-full mr-2 flex-shrink-0"
                        style={{ backgroundColor: candidate.color }}
                      ></div>
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 mr-2 flex-shrink-0">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{candidate.name}</span>

                      {/* 공약 달성 여부 표시 */}
                      <div
                        className={`ml-auto w-3 h-3 rounded-full ${
                          pledge.isComplete ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                    </div>

                    <p className="text-sm">{pledge.description}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {pledge.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 이 공약이 없는 후보들 (차이점 모드에서만 표시) */}
          {compareMode === "difference" &&
            item.candidatesWithoutPledge.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-gray-600 mb-2">
                  이 공약이 없는 후보
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.candidatesWithoutPledge.map(({ candidate }: any) => (
                    <div
                      key={candidate.id}
                      className="flex items-center p-2 rounded-lg bg-gray-100"
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 mr-2">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{candidate.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    );
  };

  // 비교 결과 가져오기
  const comparisonResults = comparePledges(selectedCategory);

  // 모달 닫을 때 처리
  const handleCloseModal = () => {
    setIsCompareModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">후보자 공약 비교</h1>
        <p className="text-text-light mb-6">
          최대 3명의 후보자를 선택하여 공약을 비교해보세요.
        </p>
      </div>

      {/* 후보자 선택 섹션 */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          비교할 후보자 선택 (최대 3명)
        </h2>

        <p className="text-primary/70 text-center mb-4 text-sm italic">
          * 후보자는 무작위 순서로 표시됩니다.
        </p>

        {/* 선택된 후보자 표시 */}
        {selectedCandidates.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">선택된 후보자</h3>
            <div className="flex flex-wrap gap-3">
              {getSelectedCandidatesData().map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center p-2 rounded-lg"
                  style={{ backgroundColor: `${candidate.color}30` }}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 mr-2">
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{candidate.name}</span>
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => toggleCandidateSelection(candidate.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 태블릿/데스크톱 화면용 그리드 */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {randomizedCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidates.includes(candidate.id)}
              onClick={() => toggleCandidateSelection(candidate.id)}
            />
          ))}
        </div>

        {/* 모바일 화면용 리스트 */}
        <div className="md:hidden space-y-3">
          {randomizedCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidates.includes(candidate.id)}
              onClick={() => toggleCandidateSelection(candidate.id)}
            />
          ))}
        </div>
      </div>

      {/* 선택된 후보자가 2명 미만일 때 안내 메시지 */}
      {selectedCandidates.length < 2 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg mt-8">
          <p className="text-lg text-gray-600">
            후보자를 2명 이상 선택하면 공약을 비교할 수 있습니다.
          </p>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline">
          <Link to="/pledges">일반 공약 보기로 돌아가기</Link>
        </Button>
      </div>

      {/* 후보자 추가 확인 모달 */}
      {isModalOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={handleCancelModal}
          >
            {/* 모달 창 */}
            <div
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">후보자 비교 옵션</h3>
              <p className="text-gray-600 mb-6">
                선택된 두 명의 후보자를 비교하시겠습니까, 아니면 한 명의
                후보자를 더 추가하여 세 명을 비교하시겠습니까?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={handleCancelModal}
                  className="order-3 sm:order-1"
                >
                  취소
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCompareTwoCandidates}
                  className="order-2"
                >
                  2명 비교하기
                </Button>
                <Button
                  variant="taeguk"
                  onClick={handleCompareThreeCandidates}
                  className="order-1 sm:order-3"
                >
                  후보자 추가 선택
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 비교 결과 모달 */}
      {isCompareModalOpen && (
        <>
          <div className="fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out">
            <div className="bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] rounded-t-xl max-h-[80vh] overflow-y-auto">
              {/* 모달 헤더 */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-10">
                <div>
                  <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <h2 className="text-xl font-semibold">
                    {compareMode === "common" ? "공통 공약" : "서로 다른 공약"}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500"
                    onClick={handleCloseModal}
                  >
                    닫기
                  </Button>
                </div>
              </div>

              {/* 모달 내용 */}
              <div className="p-4">
                {/* 비교 설정 */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    {/* 카테고리 선택 */}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-3">
                        정책 분야 선택
                      </h3>
                      <div className="flex overflow-x-auto pb-3 -mx-2 px-2 md:overflow-visible md:flex-wrap md:pb-0">
                        <div className="flex space-x-2 md:flex-wrap md:gap-2 md:space-x-0">
                          {categories.map((category) => (
                            <Button
                              key={category.id}
                              variant={
                                selectedCategory === category.id
                                  ? "taeguk"
                                  : "outline"
                              }
                              onClick={() => setSelectedCategory(category.id)}
                              className="whitespace-nowrap md:whitespace-normal px-4 py-2 md:py-1 text-base md:text-sm flex-shrink-0"
                            >
                              {category.title}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 비교 모드 선택 */}
                    <div className="md:w-64">
                      <h3 className="text-lg font-medium mb-3">비교 모드</h3>
                      <div className="flex gap-2">
                        <Button
                          variant={
                            compareMode === "common" ? "taeguk" : "outline"
                          }
                          onClick={() => setCompareMode("common")}
                          className="flex-1"
                        >
                          공통 공약
                        </Button>
                        <Button
                          variant={
                            compareMode === "difference" ? "taeguk" : "outline"
                          }
                          onClick={() => setCompareMode("difference")}
                          className="flex-1"
                        >
                          차이점
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 비교 결과 */}
                <div>
                  {comparisonResults.length > 0 ? (
                    <div className="pb-20">
                      {comparisonResults.map((item) => (
                        <PledgeComparisonCard key={item.id} item={item} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg mb-8">
                      <p className="text-lg text-gray-600">
                        {compareMode === "common"
                          ? "선택한 후보자들 간의 공통 공약이 없습니다."
                          : "선택한 후보자들 간의 차이점이 없습니다."}
                      </p>
                      <p className="text-gray-500 mt-2">
                        다른 정책 분야를 선택하거나 비교 모드를 변경해보세요.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 모달 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 z-40"
            onClick={handleCloseModal}
          ></div>
        </>
      )}
    </div>
  );
};

export default CandidateComparePage;
