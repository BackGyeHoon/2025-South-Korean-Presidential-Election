import React from "react";
import { motion } from "framer-motion";

export const AssetsReference: React.FC = () => {
  return (
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
          모든 후보자의 재산 내역이 포함되지 않았으며, 주요 후보자만 표시됩니다.
        </li>
        <li>마지막 업데이트: 2025년 4월 기준</li>
      </ul>
    </motion.div>
  );
};
