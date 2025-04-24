import React from "react";
import { motion } from "framer-motion";

export const PageHeader: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
        후보자 재산내역
      </h1>
      <p className="text-center text-gray-600 mb-8">
        2025년 대선 출마 선언 주요 후보자들의 신고된 재산 현황입니다.
      </p>
    </>
  );
};
