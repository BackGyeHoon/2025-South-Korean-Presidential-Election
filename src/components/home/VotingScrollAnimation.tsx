import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  animate,
  useAnimation,
} from "framer-motion";

const VotingScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const glowAnimation = useAnimation();

  // 모바일 환경 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 번쩍이는 효과 애니메이션
  useEffect(() => {
    const glowSequence = async () => {
      while (true) {
        await glowAnimation.start({
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
          transition: { duration: 2, ease: "easeInOut" },
        });
        // 약간의 대기 시간
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    glowSequence();
  }, [glowAnimation]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 애니메이션 단계 정의 - 더 긴 텍스트 노출 시간을 위해 단계 확장
  const phase1 = [0, 0.12]; // 초기 흩어진 상태에서 모이기 시작
  const phase2 = [0.12, 0.2]; // 투표지 모이는 단계
  const phase3 = [0.2, 0.7]; // 텍스트 노출 단계 (시간 증가)
  const phase4 = [0.7, 0.85]; // 텍스트 페이드아웃 단계

  // 텍스트 등장 및 유지 시점 - 더 오래 유지되도록 범위 확장
  const textStartPoint = 0.2;
  const textFullVisiblePoint = 0.25; // 텍스트 완전히 보이는 시점
  const textStayVisibleUntil = 0.7; // 텍스트가 계속 표시되는 구간 연장
  const textEndPoint = 0.85; // 텍스트 사라지는 시점

  // 여러 투표지를 위한 초기 위치와 회전값 (모바일/데스크톱 대응)
  const initialPositions = [
    { x: isMobile ? -80 : -150, y: isMobile ? -80 : -120, rotate: -15 },
    { x: isMobile ? 80 : 150, y: isMobile ? -40 : -80, rotate: 15 },
    { x: isMobile ? -60 : -100, y: isMobile ? 40 : 80, rotate: -10 },
    { x: isMobile ? 60 : 120, y: isMobile ? 60 : 100, rotate: 20 },
  ];

  // 공통 애니메이션 트랜스폼 (투표지가 모이는 위치로) - 텍스트 나타날 때 사라지도록 수정
  const ballotCommon = {
    opacity: useTransform(
      scrollYProgress,
      [0, phase2[1], textStartPoint, textFullVisiblePoint],
      [1, 1, 1, 0] // 텍스트가 나타날 때 투표지가 사라지도록 함
    ),
  };

  // 원형 테두리 애니메이션 - 텍스트 나타날 때 사라지도록 수정
  const circleOpacity = useTransform(
    scrollYProgress,
    [phase2[0], phase2[1], textStartPoint, textFullVisiblePoint],
    [0, 0.7, 0.7, 0]
  );

  // 텍스트 애니메이션 - 텍스트를 더 오래 표시하도록 조정
  const textOpacity = useTransform(
    scrollYProgress,
    [textStartPoint, textFullVisiblePoint, textStayVisibleUntil, textEndPoint],
    [0, 1, 1, 0]
  );

  // 텍스트 Y 위치 - 헤더 높이를 고려하여 조정
  const textY = useTransform(
    scrollYProgress,
    [textStartPoint, textFullVisiblePoint, textStayVisibleUntil, textEndPoint],
    [50, 0, 0, -50]
  );

  // 투표지 렌더링 함수
  const renderBallot = (
    index: number,
    initialPosition: (typeof initialPositions)[0]
  ) => {
    // 각 투표지의 애니메이션 값 계산
    const x = useTransform(
      scrollYProgress,
      [0, phase1[1], phase2[1]],
      [initialPosition.x, initialPosition.x * 0.3, 0] // 빠르게 모이도록
    );

    const y = useTransform(
      scrollYProgress,
      [0, phase1[1], phase2[1]],
      [initialPosition.y, initialPosition.y * 0.3, 0] // 빠르게 모이도록
    );

    const rotate = useTransform(
      scrollYProgress,
      [0, phase1[1], phase2[1]],
      [initialPosition.rotate, initialPosition.rotate * 0.3, 0] // 빠르게 회전 감소
    );

    const scale = useTransform(
      scrollYProgress,
      [0, phase1[1], phase2[0], phase2[1]],
      [0.7, 0.8, 0.9, 1]
    );

    return (
      <motion.div
        key={index}
        className="absolute"
        style={{
          x,
          y,
          rotate,
          scale,
          ...ballotCommon,
          zIndex: 20 + index,
        }}
      >
        {/* 투표지 */}
        <svg
          width={isMobile ? "90" : "130"}
          height={isMobile ? "130" : "180"}
          viewBox="0 0 80 120"
          fill="none"
        >
          {/* 투표지 배경 */}
          <rect
            width="80"
            height="120"
            rx="4"
            fill="#FFFFFF"
            stroke="#E5E7EB"
            strokeWidth="1"
          />

          {/* 투표지 내용 */}
          <rect x="10" y="10" width="60" height="10" rx="2" fill="#E5E7EB" />
          <rect x="10" y="30" width="60" height="10" rx="2" fill="#E5E7EB" />
          <rect x="10" y="50" width="60" height="10" rx="2" fill="#E5E7EB" />

          {/* 투표 항목 및 마크 (항목 먼저 그리고 체크 아이콘 그 위에 배치) */}
          <rect x="10" y="70" width="60" height="10" rx="2" fill="#E5E7EB" />

          {/* 투표 마크 - 최상위 투표지에만 체크 표시 */}
          {index === 0 && (
            <>
              <rect
                x="10"
                y="67.5"
                width="15"
                height="15"
                rx="2"
                fill="#4B5563"
              />
              <path
                d="M13 74.5L17 78.5L22 73.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
        </svg>
      </motion.div>
    );
  };

  // 스크롤 진행에 따른 컨텐츠 위치 조정 - 텍스트가 오래 표시되도록 수정
  const contentY = useTransform(
    scrollYProgress,
    [0, textStartPoint, textStayVisibleUntil, textEndPoint],
    [0, 0, isMobile ? 30 : 50, isMobile ? 50 : 70] // 텍스트 등장 및 유지 시 컨텐츠를 아래로 이동
  );

  // "계속 스크롤하세요" 텍스트 애니메이션
  const scrollHintOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.45, 0.65, 0.7],
    [0, 1, 1, 0]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[120vh] sm:h-[150vh] md:h-[180vh]" // 높이 증가로 더 긴 스크롤 경험 제공
    >
      {/* 고정된 뷰포트 컨테이너 - 모바일 헤더 높이 고려 */}
      <div className="sticky top-12 md:top-16 left-0 w-full h-[calc(100vh-48px)] md:h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        {/* 애니메이션 컨텐츠 */}
        <motion.div
          className="relative w-full max-w-[90%] sm:max-w-[85%] md:max-w-4xl mx-auto h-[70vh] md:h-[80vh] flex flex-col items-center justify-center overflow-hidden"
          style={{ y: contentY }} // 스크롤에 따라 전체 컨텐츠 위치 조정
        >
          {/* 애플 스타일 배경 흐린 그라데이션 */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0, 0.2, 0.6],
                [0.1, 0.3, 0.6] // 애니메이션에 맞게 조정
              ),
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-blue-50 to-gray-50 blur-xl md:blur-3xl"></div>
          </motion.div>

          {/* 애플 스타일 서클 */}
          <motion.div
            className="absolute z-10"
            style={{
              scale: useTransform(
                scrollYProgress,
                [0, 0.3, 0.6],
                [0.8, 1.2, 1.5]
              ),
              opacity: useTransform(
                scrollYProgress,
                [0, 0.1, 0.4, 0.7],
                [0.05, 0.1, 0.1, 0.05] // 애니메이션에 맞게 조정
              ),
              y: useTransform(scrollYProgress, [0, 0.6], [-50, 50]),
            }}
          >
            <div className="w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-blue-200 opacity-20 blur-xl md:blur-3xl"></div>
          </motion.div>

          {/* 투표지들이 모이는 중심 부분 */}
          <div className="relative flex items-center justify-center">
            {/* 투표지들 */}
            {initialPositions.map((pos, index) => renderBallot(index, pos))}

            {/* 투표지가 모인 후 나타나는 원형 테두리 */}
            <motion.div
              className="absolute z-19"
              style={{
                opacity: circleOpacity,
              }}
            >
              {/* 흐릿한 원 배경 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140px] h-[190px] md:w-[170px] md:h-[230px] rounded-xl bg-blue-100 opacity-20 blur-md"></div>

              {/* 번쩍이는 효과 */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140px] h-[190px] md:w-[170px] md:h-[230px] rounded-xl border-4 border-blue-200 opacity-0"
                animate={glowAnimation}
              ></motion.div>

              {/* 원형 테두리 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140px] h-[190px] md:w-[170px] md:h-[230px] rounded-xl border-2 border-blue-100 opacity-40 blur-sm"></div>
            </motion.div>
          </div>

          {/* 텍스트 메시지 */}
          <motion.div
            className="absolute z-30 text-center px-4 mt-24 md:mt-28" // 여백 추가해서 헤더와 겹치지 않도록
            style={{
              opacity: textOpacity,
              y: textY,
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-800">
              당신의 한 표가 미래를 바꿉니다
            </h2>
            <p className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-gray-600">
              투표는 민주주의의 가장 기본적인 참여 방식입니다
            </p>

            {/* 스크롤 힌트 */}
            <motion.div
              className="mt-8 text-sm text-gray-500 animate-bounce"
              style={{ opacity: scrollHintOpacity }}
            >
              <p>↓ 계속 스크롤하세요 ↓</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VotingScrollAnimation;
