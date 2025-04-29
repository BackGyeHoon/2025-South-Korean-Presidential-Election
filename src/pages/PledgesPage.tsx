import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { CANDIDATES } from "../data/candidates";

const PledgesPage = () => {
  // 기본 카테고리를 '모든 공약'으로 설정
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [comparisonMode, setComparisonMode] = React.useState(false);
  const [selectedCandidates, setSelectedCandidates] = React.useState<string[]>(
    []
  );
  // 랜덤으로 정렬된 후보자 목록을 저장할 state
  const [randomizedCandidates, setRandomizedCandidates] = React.useState<
    typeof CANDIDATES
  >([]);

  // 컴포넌트 마운트 시 후보자 순서를 랜덤으로 섞음
  React.useEffect(() => {
    const shuffled = [...CANDIDATES].sort(() => 0.5 - Math.random());
    setRandomizedCandidates(shuffled);
  }, []);

  // 모든 후보자의 카테고리를 모아서 중복 제거
  const categories = React.useMemo(() => {
    const allCategories = new Map();

    // 모든 후보자의 카테고리를 수집
    CANDIDATES.forEach((candidate) => {
      candidate.categories.forEach((cat) => {
        if (!allCategories.has(cat.id)) {
          allCategories.set(cat.id, cat.title);
        }
      });
    });

    // '모든 공약 보기' 카테고리를 맨 앞에 추가
    const categoriesArray = [
      { id: "all", title: "모든 공약" },
      ...Array.from(allCategories).map(([id, title]) => ({
        id,
        title,
      })),
    ];

    return categoriesArray;
  }, []);

  // 페이지 상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  // 카테고리 변경 함수
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // 카테고리 변경시 페이지 최상단으로 즉시 스크롤
    scrollToTop();
  };

  // 모드 전환 함수
  const handleModeChange = (isComparisonMode: boolean) => {
    setComparisonMode(isComparisonMode);
    if (!isComparisonMode) {
      setSelectedCandidates([]);
    }
    scrollToTop();
  };

  const toggleCandidateSelection = (candidateId: string) => {
    if (selectedCandidates.includes(candidateId)) {
      // 이미 선택된 후보자 클릭 시 선택 해제
      setSelectedCandidates(
        selectedCandidates.filter((id) => id !== candidateId)
      );
    } else {
      if (selectedCandidates.length < 2) {
        // 첫 번째 또는 두 번째 후보자 선택 시 바로 추가 (최대 2명)
        setSelectedCandidates([...selectedCandidates, candidateId]);
      } else {
        // 이미 두 명 선택됨 (이전 선택 대체)
        setSelectedCandidates([selectedCandidates[1], candidateId]);
      }
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
        className={`border rounded-lg p-4 cursor-pointer transition-all ${
          isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-blue-300"
        }`}
        onClick={onClick}
      >
        <div className="flex items-center mb-3">
          <img
            src={candidate.image}
            alt={candidate.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-bold">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.party}</p>
            <Link
              to={`/candidates/${candidate.id}`}
              className="mt-2 inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              onClick={(e) => e.stopPropagation()}
            >
              상세 정보
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // 특정 후보자와 카테고리 ID에 맞는 공약 리스트 렌더링
  const renderCandidatePledges = (
    candidate: (typeof CANDIDATES)[number],
    categoryId: string
  ) => {
    if (categoryId === "all") {
      // 모든 공약 보기 모드일 때 - 모든 카테고리의 공약 표시
      return (
        <>
          {candidate.categories.map((category) => (
            <div key={category.id} className="mb-6">
              <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200">
                {categories.find((c) => c.id === category.id)?.title ||
                  category.title}{" "}
                분야
              </h3>
              <div className="space-y-4">
                {category.pledges.map((pledge) => (
                  <div
                    key={pledge.id}
                    className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium mb-2">{pledge.title}</h4>
                      <div
                        className={`w-4 h-4 rounded-full ${
                          pledge.isComplete ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                    <p className="text-sm text-text-light mb-2">
                      {pledge.description}
                    </p>
                    <p className="text-xs text-text-light">{pledge.details}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      );
    } else {
      // 특정 카테고리 선택 모드
      const selectedCategory = candidate.categories.find(
        (cat) => cat.id === categoryId
      );

      if (!selectedCategory) return null;

      return (
        <div className="space-y-4">
          {selectedCategory.pledges.map((pledge) => (
            <div
              key={pledge.id}
              className="p-4 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium mb-2">{pledge.title}</h4>
                <div
                  className={`w-4 h-4 rounded-full ${
                    pledge.isComplete ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              </div>
              <p className="text-sm text-text-light mb-2">
                {pledge.description}
              </p>
              <p className="text-xs text-text-light">{pledge.details}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">공약 안내</h1>
        <p className="text-text-light mb-6">
          각 후보자의 분야별 공약을 확인하고 비교해보세요.
        </p>
      </div>

      {/* 스티키 헤더 그룹 */}
      <div className="sticky top-28 md:top-32 z-30 bg-white pt-2 pb-4 -mx-4 px-4 shadow-sm border-b border-gray-100 transition-all duration-300">
        {/* 공약 보기 모드 전환 */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={!comparisonMode ? "taeguk" : "outline"}
            onClick={() => handleModeChange(false)}
            className="flex-1 md:flex-none px-3 py-1.5 md:py-1 text-sm whitespace-normal"
          >
            개별 공약 보기
          </Button>

          <Button
            variant={comparisonMode ? "taeguk" : "outline"}
            onClick={() => handleModeChange(true)}
            className="flex-1 md:flex-none px-3 py-1.5 md:py-1 text-sm whitespace-normal"
          >
            공약 비교하기
          </Button>

          <Button
            variant="outline"
            asChild
            className="flex-1 md:flex-none px-3 py-1.5 md:py-1 text-sm whitespace-normal"
          >
            <Link to="/comparison" onClick={() => scrollToTop()}>
              고급 비교 모드
            </Link>
          </Button>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 md:overflow-visible md:flex-wrap md:pb-0">
          <div className="flex gap-2 md:flex-wrap md:gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "taeguk" : "outline"
                }
                onClick={() => handleCategoryChange(category.id)}
                className="px-3 py-1.5 md:py-1 text-sm whitespace-nowrap flex-shrink-0"
              >
                {category.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역 (여백 추가) */}
      <div className="mt-8 content-area">
        {/* 개별 공약 보기 모드 */}
        {!comparisonMode && (
          <>
            <p className="text-primary/70 text-center mb-6 text-sm italic">
              * 후보자는 무작위 순서로 표시됩니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {randomizedCandidates.map((candidate) => {
                // '모든 공약 보기' 선택 시 모든 후보자 표시
                if (selectedCategory === "all") {
                  return (
                    <div
                      key={candidate.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                    >
                      {/* 후보자 정보 상단 */}
                      <div
                        className="h-2"
                        style={{ backgroundColor: candidate.color }}
                      ></div>
                      <div className="p-6">
                        <div className="flex items-center mb-6">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mr-4">
                            <img
                              src={candidate.image}
                              alt={candidate.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold">
                              {candidate.name}
                            </h2>
                            <p className="text-text-light">{candidate.party}</p>
                            <Button
                              asChild
                              variant="ghost"
                              className="text-primary mt-2 p-0"
                            >
                              <Link to={`/candidates/${candidate.id}`}>
                                자세히 보기
                              </Link>
                            </Button>
                          </div>
                        </div>

                        {/* 공약 리스트 렌더링 */}
                        {renderCandidatePledges(candidate, selectedCategory)}
                      </div>
                    </div>
                  );
                }

                // 현재 선택된 카테고리가 이 후보자의 카테고리에 있는지 확인
                const hasCategory = candidate.categories.some(
                  (cat) => cat.id === selectedCategory
                );

                // 없으면 렌더링 안 함
                if (!hasCategory) return null;

                return (
                  <div
                    key={candidate.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                  >
                    {/* 후보자 정보 상단 */}
                    <div
                      className="h-2"
                      style={{ backgroundColor: candidate.color }}
                    ></div>
                    <div className="p-6">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mr-4">
                          <img
                            src={candidate.image}
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">
                            {candidate.name}
                          </h2>
                          <p className="text-text-light">{candidate.party}</p>
                          <Button
                            asChild
                            variant="ghost"
                            className="text-primary mt-2 p-0"
                          >
                            <Link to={`/candidates/${candidate.id}`}>
                              자세히 보기
                            </Link>
                          </Button>
                        </div>
                      </div>

                      {/* 공약 리스트 - 선택된 카테고리만 */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          {
                            categories.find((c) => c.id === selectedCategory)
                              ?.title
                          }{" "}
                          분야 공약
                        </h3>

                        {/* 공약 리스트 렌더링 */}
                        {renderCandidatePledges(candidate, selectedCategory)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* 공약 비교 모드 - 기존 코드 유지 */}
        {comparisonMode && (
          <div>
            {/* 후보자 선택 UI */}
            {selectedCandidates.length < 2 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  비교할 후보자를 선택하세요 (최대 2명)
                </h2>

                <p className="text-primary/70 text-center mb-4 text-sm italic">
                  * 후보자는 무작위 순서로 표시됩니다.
                </p>

                {/* 태블릿/데스크톱 화면용 그리드 */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
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
            )}

            {/* 비교 테이블 */}
            {selectedCandidates.length >= 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">후보자 공약 비교</h2>

                {/* 테이블 형태 (태블릿/데스크톱 화면용) */}
                <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-4 text-left font-medium text-text-light">
                          공약
                        </th>
                        {selectedCandidates.map((candidateId) => {
                          const candidate = CANDIDATES.find(
                            (c) => c.id === candidateId
                          )!;
                          return (
                            <th
                              key={candidateId}
                              className="p-4 text-left font-medium"
                              style={{
                                borderBottom: `2px solid ${candidate.color}`,
                              }}
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 mr-2">
                                  <img
                                    src={candidate.image}
                                    alt={candidate.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span>{candidate.name}</span>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {/* 선택된 카테고리 공약 비교 */}
                      {(() => {
                        // 선택된 후보들의 현재 카테고리에 있는 모든 공약 ID를 모음
                        const pledgeIds = new Set();

                        // '모든 공약 보기' 모드인 경우와 특정 카테고리 선택 모드 구분
                        if (selectedCategory === "all") {
                          // 모든 카테고리의 모든 공약 수집
                          selectedCandidates.forEach((candidateId) => {
                            const candidate = CANDIDATES.find(
                              (c) => c.id === candidateId
                            );
                            candidate?.categories.forEach((category) => {
                              category.pledges.forEach((pledge) =>
                                pledgeIds.add(`${category.id}-${pledge.id}`)
                              );
                            });
                          });
                        } else {
                          // 특정 카테고리의 공약만 수집
                          selectedCandidates.forEach((candidateId) => {
                            const candidate = CANDIDATES.find(
                              (c) => c.id === candidateId
                            );
                            const category = candidate?.categories.find(
                              (cat) => cat.id === selectedCategory
                            );
                            category?.pledges.forEach((pledge) =>
                              pledgeIds.add(pledge.id)
                            );
                          });
                        }

                        // 모든 공약에 대해 각 후보의 공약을 비교
                        return Array.from(pledgeIds).map((pledgeId) => {
                          const isCompositeId =
                            typeof pledgeId === "string" &&
                            pledgeId.includes("-");
                          const [categoryId, simplePledgeId] = isCompositeId
                            ? (pledgeId as string).split("-")
                            : [selectedCategory, pledgeId];

                          // 첫 번째 공약 제목을 찾기 (표시용)
                          let pledgeTitle = "";
                          let categoryTitle = "";

                          for (const candidateId of selectedCandidates) {
                            const candidate = CANDIDATES.find(
                              (c) => c.id === candidateId
                            );
                            const category = candidate?.categories.find(
                              (cat) => cat.id === categoryId
                            );
                            const pledge = category?.pledges.find(
                              (p) => p.id === (simplePledgeId as string)
                            );
                            if (pledge && category) {
                              pledgeTitle = pledge.title;
                              categoryTitle = category.title;
                              break;
                            }
                          }

                          return (
                            <tr
                              key={pledgeId as string}
                              className="border-t border-gray-100"
                            >
                              <td className="p-4 font-medium">
                                {selectedCategory === "all" && (
                                  <div className="text-xs text-blue-500 mb-1">
                                    {categoryTitle}
                                  </div>
                                )}
                                {pledgeTitle}
                              </td>
                              {selectedCandidates.map((candidateId) => {
                                const candidate = CANDIDATES.find(
                                  (c) => c.id === candidateId
                                )!;
                                const category = candidate.categories.find(
                                  (cat) => cat.id === categoryId
                                );
                                const pledge = category?.pledges.find(
                                  (p) => p.id === (simplePledgeId as string)
                                );

                                return (
                                  <td
                                    key={`${candidateId}-${pledgeId}`}
                                    className="p-4"
                                  >
                                    {pledge ? (
                                      <div>
                                        <div className="flex items-center justify-between mb-1">
                                          <p>{pledge.description}</p>
                                          <div
                                            className={`w-3 h-3 rounded-full ${
                                              pledge.isComplete
                                                ? "bg-green-500"
                                                : "bg-gray-300"
                                            }`}
                                          ></div>
                                        </div>
                                        <p className="text-sm text-text-light">
                                          {pledge.details}
                                        </p>
                                      </div>
                                    ) : (
                                      <p className="text-text-light italic">
                                        해당 공약 없음
                                      </p>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>

                {/* 카드 형태 UI (모바일 화면용) */}
                <div className="md:hidden space-y-8">
                  {(() => {
                    // 선택된 후보들의 현재 카테고리에 있는 모든 공약 ID를 모음
                    const pledgeIds = new Set();

                    // '모든 공약 보기' 모드인 경우와 특정 카테고리 선택 모드 구분
                    if (selectedCategory === "all") {
                      // 모든 카테고리의 모든 공약 수집
                      selectedCandidates.forEach((candidateId) => {
                        const candidate = CANDIDATES.find(
                          (c) => c.id === candidateId
                        );
                        candidate?.categories.forEach((category) => {
                          category.pledges.forEach((pledge) =>
                            pledgeIds.add(`${category.id}-${pledge.id}`)
                          );
                        });
                      });
                    } else {
                      // 특정 카테고리의 공약만 수집
                      selectedCandidates.forEach((candidateId) => {
                        const candidate = CANDIDATES.find(
                          (c) => c.id === candidateId
                        );
                        const category = candidate?.categories.find(
                          (cat) => cat.id === selectedCategory
                        );
                        category?.pledges.forEach((pledge) =>
                          pledgeIds.add(pledge.id)
                        );
                      });
                    }

                    // 모든 공약에 대해 모바일 카드 생성
                    return Array.from(pledgeIds).map((pledgeId) => {
                      const isCompositeId =
                        typeof pledgeId === "string" && pledgeId.includes("-");
                      const [categoryId, simplePledgeId] = isCompositeId
                        ? (pledgeId as string).split("-")
                        : [selectedCategory, pledgeId];

                      // 첫 번째 공약 제목을 찾기 (표시용)
                      let pledgeTitle = "";
                      let categoryTitle = "";

                      for (const candidateId of selectedCandidates) {
                        const candidate = CANDIDATES.find(
                          (c) => c.id === candidateId
                        );
                        const category = candidate?.categories.find(
                          (cat) => cat.id === categoryId
                        );
                        const pledge = category?.pledges.find(
                          (p) => p.id === (simplePledgeId as string)
                        );
                        if (pledge && category) {
                          pledgeTitle = pledge.title;
                          categoryTitle = category.title;
                          break;
                        }
                      }

                      return (
                        <div
                          key={pledgeId as string}
                          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                        >
                          <div className="p-4 bg-gray-50 border-b border-gray-200">
                            {selectedCategory === "all" && (
                              <div className="text-xs text-blue-500 mb-1">
                                {categoryTitle}
                              </div>
                            )}
                            <h3 className="font-medium">{pledgeTitle}</h3>
                          </div>

                          <div className="divide-y divide-gray-100">
                            {selectedCandidates.map((candidateId) => {
                              const candidate = CANDIDATES.find(
                                (c) => c.id === candidateId
                              )!;
                              const category = candidate.categories.find(
                                (cat) => cat.id === categoryId
                              );
                              const pledge = category?.pledges.find(
                                (p) => p.id === (simplePledgeId as string)
                              );

                              return (
                                <div
                                  key={`${candidateId}-${pledgeId}`}
                                  className="p-4"
                                >
                                  <div className="flex items-center mb-3">
                                    <div
                                      className="w-4 h-4 rounded-full mr-2"
                                      style={{
                                        backgroundColor: candidate.color,
                                      }}
                                    ></div>
                                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 mr-2">
                                      <img
                                        src={candidate.image}
                                        alt={candidate.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <span className="font-medium">
                                      {candidate.name}
                                    </span>
                                  </div>

                                  {pledge ? (
                                    <div>
                                      <div className="flex items-start justify-between mb-1">
                                        <p className="text-sm">
                                          {pledge.description}
                                        </p>
                                        <div
                                          className={`w-3 h-3 rounded-full ml-2 mt-1 flex-shrink-0 ${
                                            pledge.isComplete
                                              ? "bg-green-500"
                                              : "bg-gray-300"
                                          }`}
                                        ></div>
                                      </div>
                                      <p className="text-xs text-text-light mt-2">
                                        {pledge.details}
                                      </p>
                                    </div>
                                  ) : (
                                    <p className="text-text-light italic text-sm">
                                      해당 공약 없음
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                <div className="mt-6 text-right">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCandidates([])}
                  >
                    다른 후보자 비교
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PledgesPage;
