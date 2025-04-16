import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CANDIDATES } from "./PledgesPage"; // PledgesPage에서 후보자 데이터 가져오기
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// 투표 애니메이션 컴포넌트
const VotingAnimation = () => {
  const [step, setStep] = useState(0);

  // 단계별 애니메이션 자동 전환
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* 배경 요소들 */}
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 태극기 모티브 원형 - 상단 */}
        <motion.div
          className="absolute top-5 right-5 w-40 h-40 rounded-full bg-[#CD2E3A]/10"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 태극기 모티브 원형 - 하단 */}
        <motion.div
          className="absolute bottom-5 left-5 w-32 h-32 rounded-full bg-[#003478]/10"
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, -5, 0],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* 작은 장식 요소들 */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#003478] rounded-full opacity-30"></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-[#CD2E3A] rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-[#003478] rounded-full opacity-30"></div>
      </motion.div>

      {/* 중앙 콘텐츠 */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="voting-scene"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md h-80 md:h-96"
          >
            {/* 투표 애니메이션 */}
            <div className="mt-10 flex flex-col items-center">
              {/* 테이블 */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-72 h-8 bg-[#e0e0e0] rounded-lg shadow-md"></div>

              {/* 투표지 */}
              <div className="absolute bottom-18 left-1/2 -translate-x-1/2 w-56 h-48 bg-white rounded-md shadow-md transform rotate-1">
                <div className="h-full flex flex-col justify-center items-center pt-4">
                  <div className="w-11/12 border-b border-gray-200 pb-2 mb-4 text-center">
                    <div className="text-sm font-semibold text-gray-700">
                      제21대 대통령 선거
                    </div>
                    <div className="text-xs text-gray-500">2025년 6월 3일</div>
                  </div>

                  <div className="w-4/5 h-8 border border-gray-300 rounded-sm mb-5 flex items-center">
                    <div className="w-6 h-6 flex-shrink-0 ml-2 mr-3 text-xs flex items-center justify-center border border-gray-400 rounded-full">
                      1
                    </div>
                    <div className="text-sm">후보자 A</div>
                    <motion.div
                      className="ml-auto mr-4 w-5 h-5 bg-black rounded-full"
                      animate={{
                        scale: [0, 1, 1],
                        opacity: [0, 1, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        times: [0, 0.2, 1],
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  </div>

                  <div className="w-4/5 h-8 border border-gray-300 rounded-sm mb-5 flex items-center">
                    <div className="w-6 h-6 flex-shrink-0 ml-2 mr-3 text-xs flex items-center justify-center border border-gray-400 rounded-full">
                      2
                    </div>
                    <div className="text-sm">후보자 B</div>
                  </div>

                  <div className="w-4/5 h-8 border border-gray-300 rounded-sm flex items-center">
                    <div className="w-6 h-6 flex-shrink-0 ml-2 mr-3 text-xs flex items-center justify-center border border-gray-400 rounded-full">
                      3
                    </div>
                    <div className="text-sm">후보자 C</div>
                  </div>
                </div>
              </div>

              {/* 펜 애니메이션 */}
              <motion.div
                className="absolute bottom-40 left-[70%] w-3 h-12 bg-blue-900 origin-bottom"
                initial={{ rotate: -20, x: -10, y: -5 }}
                animate={{
                  rotate: [20, -20, 20],
                  x: [5, -10, 5],
                  y: [-2, -5, -2],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-4 bg-gray-400"></div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="candidate-comparison"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md h-80 md:h-96"
          >
            <motion.div className="absolute top-3 left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-500">
              <div className="flex items-center">
                <div className="w-10 h-[1px] bg-gray-300 mr-2"></div>
                공약 비교
                <div className="w-10 h-[1px] bg-gray-300 ml-2"></div>
              </div>
            </motion.div>

            <div className="mt-12 flex flex-col items-center">
              {/* 공약 비교 테이블 */}
              <motion.div
                className="w-[90%] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {/* 테이블 헤더 */}
                <div className="flex border-b border-gray-200">
                  <div className="w-1/3 p-3 bg-gray-50 text-center text-sm font-medium">
                    정책 분야
                  </div>
                  <div className="w-1/3 p-3 bg-[#003478]/10 text-center text-sm font-medium">
                    후보자 A
                  </div>
                  <div className="w-1/3 p-3 bg-[#CD2E3A]/10 text-center text-sm font-medium">
                    후보자 B
                  </div>
                </div>

                {/* 테이블 행 */}
                <motion.div
                  className="flex border-b border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="w-1/3 p-3 text-center text-xs font-medium">
                    경제
                  </div>
                  <div className="w-1/3 p-3 text-center text-xs">
                    경제 활성화
                  </div>
                  <div className="w-1/3 p-3 text-center text-xs">물가 안정</div>
                </motion.div>

                <motion.div
                  className="flex border-b border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="w-1/3 p-3 text-center text-xs font-medium">
                    복지
                  </div>
                  <div className="w-1/3 p-3 text-center text-xs">
                    기본소득 도입
                  </div>
                  <div className="w-1/3 p-3 text-center text-xs">복지 확대</div>
                </motion.div>

                <motion.div
                  className="flex"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="w-1/3 p-3 text-center text-xs font-medium">
                    교육
                  </div>
                  <div className="w-1/3 p-3 text-center text-xs">
                    교육비 절감
                  </div>
                  <div className="w-1/3 p-3 text-center text-xs">교육 개혁</div>
                </motion.div>
              </motion.div>

              {/* 비교 화살표 애니메이션 */}
              <motion.div
                className="mt-8 flex justify-center items-center gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-[#003478]/20 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5L15 12L9 19"
                      stroke="#003478"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>

                <motion.div
                  className="w-10 h-10 rounded-full bg-[#CD2E3A]/20 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.3,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5L9 12L15 19"
                      stroke="#CD2E3A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="policy-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md h-80 md:h-96"
          >
            <motion.div className="absolute top-3 left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-500">
              <div className="flex items-center">
                <div className="w-10 h-[1px] bg-gray-300 mr-2"></div>
                정책 분야
                <div className="w-10 h-[1px] bg-gray-300 ml-2"></div>
              </div>
            </motion.div>

            <div className="mt-12 flex flex-col items-center">
              {/* 정책 분야 카드 */}
              <motion.div
                className="w-[90%] bg-white/10 rounded-lg overflow-hidden"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {/* 정책 카드들 */}
                <motion.div
                  className="mb-4 p-3 border border-[#003478]/20 rounded-lg bg-[#003478]/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#003478]/20 flex items-center justify-center mr-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.902 7.398c-.936 0-1.699-.757-1.699-1.699 0-.936.763-1.699 1.699-1.699.938 0 1.7.763 1.7 1.699 0 .942-.762 1.699-1.7 1.699zm2.708 8.932a.75.75 0 01-.977.391c-2.358-.97-4.109-3.06-4.607-5.59L6.95 9.403a.75.75 0 11.964-1.151l.211.037c.306.053.612-.008.88-.212l.818-.619c.326-.247.755-.287 1.122-.106l.99.49c.311.153.535.425.653.74l.311.828c.073.194.098.393.078.592l-.556 5.56c-.129 1.286.302 2.584 1.147 3.479l.108.102c.11.104.233.192.369.257l.083.033a.75.75 0 01.391.976z"
                          fill="#003478"
                          fillOpacity="0.7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">
                        경제 정책
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        일자리 창출, 경제 성장, 물가 안정
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mb-4 p-3 border border-[#CD2E3A]/20 rounded-lg bg-[#CD2E3A]/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#CD2E3A]/20 flex items-center justify-center mr-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"
                          fill="#CD2E3A"
                          fillOpacity="0.7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">
                        복지 정책
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        사회 안전망, 복지 서비스 확대
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mb-4 p-3 border border-blue-300/30 rounded-lg bg-blue-50/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100/60 flex items-center justify-center mr-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z"
                          fill="rgb(59, 130, 246)"
                          fillOpacity="0.7"
                        />
                        <path
                          d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z"
                          fill="rgb(59, 130, 246)"
                          fillOpacity="0.7"
                        />
                        <path
                          d="M4.462 19.462c.42.419.97.628 1.518.628a4.5 4.5 0 01-1.897-8.521 1.5 1.5 0 002.007 1.946A3 3 0 008.97 16.27a1.5 1.5 0 002.246.97 41.078 41.078 0 014.7-2.62 1.5 1.5 0 00.85-1.352v-.01a1.5 1.5 0 00-.781-1.314 41.058 41.058 0 00-5.037-2.395 1.5 1.5 0 00-2.048.79 3 3 0 00-3.643-.24 1.5 1.5 0 00-2.003 1.95 4.5 4.5 0 001.208 8.911z"
                          fill="rgb(59, 130, 246)"
                          fillOpacity="0.7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">
                        교육 정책
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        교육 혁신, 교육비 부담 경감
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-3 border border-green-300/30 rounded-lg bg-green-50/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100/60 flex items-center justify-center mr-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z"
                          fill="rgb(34, 197, 94)"
                          fillOpacity="0.7"
                        />
                        <path
                          d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z"
                          fill="rgb(34, 197, 94)"
                          fillOpacity="0.7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">
                        환경 정책
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        지속가능한 발전, 탄소중립 추진
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* 하단 아이콘 */}
              <motion.div
                className="mt-5 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-gray-100/30 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      stroke="#4B5563"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="calendar-countdown"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md h-80 md:h-96"
          >
            <motion.div className="absolute top-3 left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-500">
              <div className="flex items-center">
                <div className="w-10 h-[1px] bg-gray-300 mr-2"></div>
                선거일 안내
                <div className="w-10 h-[1px] bg-gray-300 ml-2"></div>
              </div>
            </motion.div>

            <div className="mt-14 flex flex-col items-center">
              {/* 달력 */}
              <motion.div
                className="w-[90%] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {/* 달력 헤더 */}
                <div className="bg-[#003478] text-white p-3 text-center">
                  <div className="text-sm font-bold">6월</div>
                </div>

                {/* 요일 */}
                <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                  {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
                    <div
                      key={i}
                      className="p-1 text-center text-xs text-gray-500"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* 날짜 행 */}
                <div className="grid grid-cols-7 text-xs">
                  <div className="p-2 text-center text-gray-400">25</div>
                  <div className="p-2 text-center text-gray-400">26</div>
                  <div className="p-2 text-center text-gray-400">27</div>
                  <div className="p-2 text-center text-gray-400">28</div>
                  <div className="p-2 text-center text-gray-400">29</div>
                  <div className="p-2 text-center text-gray-400">30</div>
                  <div className="p-2 text-center text-gray-400">31</div>
                </div>

                <div className="grid grid-cols-7 text-xs">
                  <div className="p-2 text-center">1</div>
                  <div className="p-2 text-center">2</div>
                  <motion.div
                    className="p-2 flex items-center justify-center"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#CD2E3A] text-white flex items-center justify-center">
                      3
                    </div>
                  </motion.div>
                  <div className="p-2 text-center">4</div>
                  <div className="p-2 text-center">5</div>
                  <div className="p-2 text-center">6</div>
                  <div className="p-2 text-center">7</div>
                </div>
              </motion.div>

              {/* 투표 안내 */}
              <motion.div
                className="mt-6 p-4 w-[90%] bg-[#003478]/5 rounded-lg border border-[#003478]/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="text-sm font-medium text-center mb-3 text-gray-700">
                  투표 일정
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-600">선거일</span>
                  <span className="font-medium">6월 3일 (화)</span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-600">투표시간</span>
                  <span className="font-medium">오전 6시 ~ 오후 6시</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">사전투표</span>
                  <span className="font-medium">
                    5월 29일(목) ~ 5월 30일(금)
                  </span>
                </div>
              </motion.div>

              {/* 투표 아이콘 */}
              <motion.div
                className="mt-4 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <motion.svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path
                    d="M9 12L11 14L15 10M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                    stroke="#003478"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [randomCandidates, setRandomCandidates] = useState<typeof CANDIDATES>(
    []
  );

  const headlines = [
    ["대한민국의 선택", "제21대 대통령 선거"],
    ["정치, 이제는", "공정하게 비교하자"],
    ["공약과 이력", "투명하게 한눈에"],
    ["선거일 6월 3일", "소중한 한 표"],
  ];

  // 페이지가 로드될 때 랜덤으로 후보자 선택
  useEffect(() => {
    // 후보자 배열 복사 및 섞기
    const shuffled = [...CANDIDATES].sort(() => 0.5 - Math.random());
    // 랜덤으로 3명만 선택
    setRandomCandidates(shuffled.slice(0, 3));
  }, []);

  // 4초마다 텍스트 변경
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % headlines.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [headlines.length]);

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-r from-primary/5 to-accent py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            {/* 텍스트 및 버튼 영역 */}
            <div className="lg:w-1/2 w-full text-center flex flex-col items-center justify-center mb-12 lg:mb-0 lg:pr-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
                    {headlines[activeIndex][0]}
                  </h1>
                  <p className="text-2xl text-gray-600">
                    {headlines[activeIndex][1]}
                  </p>
                </motion.div>
              </AnimatePresence>
              <Link to="/pledges">
                <Button size="lg" className="mt-8">
                  후보자 정보 보러가기
                </Button>
              </Link>
            </div>

            {/* 애니메이션 영역 */}
            <div className="lg:w-1/2 w-full flex justify-center h-80 md:h-96">
              <VotingAnimation />
            </div>
          </div>
        </div>

        {/* 배경 장식 요소들 */}
        <div className="absolute top-0 right-0 -z-10">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-32 -mt-32"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full -ml-20 -mb-20"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
        </div>
      </section>

      {/* 주요 정보 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            주요 선거 정보
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              title="선거일"
              icon={<CalendarIcon />}
              description="6월 3일 (화)"
              details="오전 6시부터 오후 6시까지"
            />

            <InfoCard
              title="사전투표"
              icon={<CheckCircleIcon />}
              description="5월 29일 ~ 5월 30일"
              details="오전 6시부터 오후 6시까지"
            />

            <InfoCard
              title="투표 자격"
              icon={<UserIcon />}
              description="만 18세 이상 대한민국 국민"
              details="2007년 3월 6일 4일 이전 출생자"
            />
          </div>
        </div>
      </section>

      {/* 후보자 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">주요 후보자</h2>
          <p className="text-text-light text-center mb-2">
            각 후보자의 공약과 주요 정책을 확인해보세요
          </p>
          <p className="text-primary/70 text-center mb-12 text-sm italic">
            * 아래 후보자는 무작위로 선정되어 표시됩니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CandidateCard
                  name={candidate.name}
                  party={candidate.party}
                  image={candidate.image}
                  color={candidate.color}
                  id={candidate.id}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/pledges">후보자 공약 자세히 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            대한민국의 미래, 여러분의 한 표가 결정합니다
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            투표는 민주주의의 가장 기본적인 권리이자 의무입니다. 소중한 한 표로
            우리나라의 미래를 함께 만들어 가세요.
          </p>
          <Button
            asChild
            variant="default"
            size="lg"
            className="text-white font-medium text-md border-2 border-white"
          >
            <Link to="/voting-info" className="px-10 py-3">
              투표 방법 알아보기
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

// 아이콘 컴포넌트들
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// 정보 카드 컴포넌트
const InfoCard = ({
  title,
  icon,
  description,
  details,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-lg font-medium mb-1">{description}</p>
      <p className="text-text-light">{details}</p>
    </div>
  );
};

// 후보자 카드 컴포넌트
const CandidateCard = ({
  name,
  party,
  image,
  color,
  id,
}: {
  name: string;
  party: string;
  image: string;
  color: string;
  id: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      <div className="h-4" style={{ backgroundColor: color }}></div>
      <div className="p-6">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gray-100">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-bold text-center">{name}</h3>
        <p className="text-text-light text-center">{party}</p>

        <div className="mt-4 text-center">
          <Button asChild variant="ghost" className="text-primary">
            <Link to={`/candidates/${id}`}>자세히 보기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
