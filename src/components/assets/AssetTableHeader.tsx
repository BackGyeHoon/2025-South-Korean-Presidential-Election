import React, { useRef, useEffect } from "react";

interface AssetTableHeaderProps {
  selectAll: boolean;
  handleSelectAll: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  assetFilter: number;
  setAssetFilter: (filter: number) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}

export const AssetTableHeader: React.FC<AssetTableHeaderProps> = ({
  selectAll,
  handleSelectAll,
  searchQuery,
  setSearchQuery,
  assetFilter,
  setAssetFilter,
  dropdownOpen,
  setDropdownOpen,
}) => {
  // 드롭다운 외부 클릭 감지를 위한 ref
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지 이벤트 핸들러
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownOpen
      ) {
        setDropdownOpen(false);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, setDropdownOpen]);

  // 자산 필터 옵션
  const assetFilterOptions = [
    { id: 0, label: "전체", description: "모든 후보자" },
    { id: 1, label: "100억 이상", description: "총 자산 100억원 이상" },
    { id: 2, label: "50억 이상", description: "총 자산 50억원 이상" },
    { id: 3, label: "30억 이상", description: "총 자산 30억원 이상" },
  ];

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h2 className="text-lg font-medium mb-4">검색 및 필터</h2>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
        {/* 검색창 */}
        <div className="w-full sm:max-w-md">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              name="search"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="후보자 또는 정당 검색"
            />
          </div>
        </div>

        {/* 자산 필터 드롭다운 */}
        <div className="relative inline-block" ref={dropdownRef}>
          <button
            type="button"
            className="inline-flex w-full sm:w-auto justify-between items-center gap-x-1 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>
              {
                assetFilterOptions.find((option) => option.id === assetFilter)
                  ?.label
              }
            </span>
            <span className="ml-2 text-gray-400">
              {dropdownOpen ? "▲" : "▼"}
            </span>
          </button>

          {/* 드롭다운 메뉴 - z-index 높이고 위치 상대값 조정 */}
          {dropdownOpen && (
            <div
              className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              <div className="py-1">
                {assetFilterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setAssetFilter(option.id);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      assetFilter === option.id
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700"
                    } hover:bg-gray-50`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 전체 선택 토글 버튼 - 텍스트 제거하고 아이콘만 사용 */}
        <div className="inline-flex">
          <button
            onClick={handleSelectAll}
            className={`flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors duration-200 ${
              selectAll
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            }`}
            title={selectAll ? "선택 해제" : "전체 선택"}
            aria-label={selectAll ? "선택 해제" : "전체 선택"}
          >
            {selectAll ? (
              // 선택된 상태일 때 아이콘 (체크 포함)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 4.5A.75.75 0 013 3.75h10.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 4.5A.75.75 0 013 8.25h10.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 4.5A.75.75 0 013 12.75h10.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 4.5A.75.75 0 013 17.25h10.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM15 8.25a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zm.75 4.5a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z"
                />
              </svg>
            ) : (
              // 선택되지 않은 상태일 때 아이콘
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetTableHeader;
