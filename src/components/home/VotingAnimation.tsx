import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        {step === 0 && <VotingScene />}
        {step === 1 && <CandidateComparison />}
        {step === 2 && <PolicyAnalysis />}
        {step === 3 && <VotingInformation />}
      </AnimatePresence>
    </div>
  );
};

// 투표 장면 컴포넌트
const VotingScene = () => (
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
);

// 후보자 비교 컴포넌트
const CandidateComparison = () => (
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
          <div className="w-1/3 p-3 text-center text-xs font-medium">경제</div>
          <div className="w-1/3 p-3 text-center text-xs">경제 활성화</div>
          <div className="w-1/3 p-3 text-center text-xs">물가 안정</div>
        </motion.div>

        <motion.div
          className="flex border-b border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="w-1/3 p-3 text-center text-xs font-medium">복지</div>
          <div className="w-1/3 p-3 text-center text-xs">기본소득 도입</div>
          <div className="w-1/3 p-3 text-center text-xs">복지 확대</div>
        </motion.div>

        <motion.div
          className="flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="w-1/3 p-3 text-center text-xs font-medium">교육</div>
          <div className="w-1/3 p-3 text-center text-xs">교육비 절감</div>
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
              d="M7 16L3 12M3 12L7 8M3 12H21"
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
            delay: 0.5,
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
              d="M17 8L21 12M21 12L17 16M21 12H3"
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
);

// 정책 분석 컴포넌트
const PolicyAnalysis = () => (
  <motion.div
    key="policy-analysis"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="relative w-full max-w-md h-80 md:h-96"
  >
    <motion.div className="absolute top-3 left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-500">
      <div className="flex items-center">
        <div className="w-10 h-[1px] bg-gray-300 mr-2"></div>
        정책 분석
        <div className="w-10 h-[1px] bg-gray-300 ml-2"></div>
      </div>
    </motion.div>

    <div className="mt-16 flex flex-col items-center">
      {/* 차트 애니메이션 */}
      <motion.div
        className="w-[90%] h-48 bg-white rounded-lg shadow-lg p-4 border border-gray-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="text-xs font-medium text-gray-500 mb-3">
          경제 정책 비교 분석
        </div>

        {/* 막대 그래프 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <div className="w-20 text-xs">일자리 창출</div>
            <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#003478] to-[#003478]/70"
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ delay: 0.4, duration: 1 }}
              ></motion.div>
            </div>
            <div className="ml-2 text-xs w-8">70%</div>
          </div>

          <div className="flex items-center">
            <div className="w-20 text-xs">물가 안정</div>
            <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#CD2E3A] to-[#CD2E3A]/70"
                initial={{ width: 0 }}
                animate={{ width: "55%" }}
                transition={{ delay: 0.6, duration: 1 }}
              ></motion.div>
            </div>
            <div className="ml-2 text-xs w-8">55%</div>
          </div>

          <div className="flex items-center">
            <div className="w-20 text-xs">부동산</div>
            <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#003478] to-[#003478]/70"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ delay: 0.8, duration: 1 }}
              ></motion.div>
            </div>
            <div className="ml-2 text-xs w-8">60%</div>
          </div>

          <div className="flex items-center">
            <div className="w-20 text-xs">세금 정책</div>
            <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#CD2E3A] to-[#CD2E3A]/70"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 1, duration: 1 }}
              ></motion.div>
            </div>
            <div className="ml-2 text-xs w-8">80%</div>
          </div>
        </div>
      </motion.div>

      {/* 분석 결과 */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="text-sm text-gray-500">
          후보자들의 경제 정책을 비교 분석하세요
        </div>
        <div className="text-xs text-gray-400 mt-1">
          복지, 외교, 교육 등 다양한 분야별 정책도 확인할 수 있습니다
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// 투표 정보 컴포넌트
const VotingInformation = () => (
  <motion.div
    key="voting-information"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="relative w-full max-w-md h-80 md:h-96"
  >
    <motion.div className="absolute top-3 left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-500">
      <div className="flex items-center">
        <div className="w-10 h-[1px] bg-gray-300 mr-2"></div>
        투표 정보
        <div className="w-10 h-[1px] bg-gray-300 ml-2"></div>
      </div>
    </motion.div>

    <div className="mt-16 flex flex-col items-center">
      {/* 투표 정보 카드 */}
      <motion.div
        className="w-[90%] bg-white rounded-lg shadow-lg p-5 border border-gray-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold">대통령 선거 일정</div>
          <div className="bg-[#003478]/10 text-[#003478] px-2 py-1 rounded text-xs font-medium">
            D-365
          </div>
        </div>

        {/* 일정 항목들 */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center text-xs">
            <div className="w-6 h-6 rounded-full bg-[#003478]/10 flex items-center justify-center mr-3">
              <CalendarIcon />
            </div>
            <div className="flex-1">
              <div className="font-medium">선거일</div>
              <div className="text-gray-500 mt-0.5">2025년 6월 3일</div>
            </div>
          </div>

          <div className="flex items-center text-xs">
            <div className="w-6 h-6 rounded-full bg-[#003478]/10 flex items-center justify-center mr-3">
              <CalendarIcon />
            </div>
            <div className="flex-1">
              <div className="font-medium">사전투표일</div>
              <div className="text-gray-500 mt-0.5">2025년 5월 29일 ~ 30일</div>
            </div>
          </div>

          <div className="flex items-center text-xs">
            <div className="w-6 h-6 rounded-full bg-[#003478]/10 flex items-center justify-center mr-3">
              <CheckCircleIcon />
            </div>
            <div className="flex-1">
              <div className="font-medium">선거권 확인</div>
              <div className="text-gray-500 mt-0.5">
                만 18세 이상 대한민국 국민
              </div>
            </div>
          </div>

          <div className="flex items-center text-xs">
            <div className="w-6 h-6 rounded-full bg-[#003478]/10 flex items-center justify-center mr-3">
              <UserIcon />
            </div>
            <div className="flex-1">
              <div className="font-medium">투표소 확인</div>
              <div className="text-gray-500 mt-0.5">
                중앙선거관리위원회 홈페이지에서 확인 가능
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

// 아이콘 컴포넌트들
const CalendarIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
      stroke="#003478"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="#003478"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
      stroke="#003478"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
      stroke="#003478"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default VotingAnimation;
