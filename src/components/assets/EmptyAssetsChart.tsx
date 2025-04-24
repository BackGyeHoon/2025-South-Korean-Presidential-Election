import React from "react";

export const EmptyAssetsChart: React.FC = () => {
  return (
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
  );
};
