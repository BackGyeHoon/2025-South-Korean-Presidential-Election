import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import VotingAnimation from "../components/home/VotingAnimation";
import { CANDIDATES } from "./PledgesPage";

const HomePage: React.FC = () => {
  // 후보자 목록을 랜덤하게 섞기
  const [shuffledCandidates, setShuffledCandidates] = useState([...CANDIDATES]);

  useEffect(() => {
    // 컴포넌트 마운트 시 후보자 목록을 랜덤하게 섞음
    const shuffled = [...CANDIDATES].sort(() => Math.random() - 0.5);
    setShuffledCandidates(shuffled);
  }, []);

  return (
    <div className="w-full min-h-screen">
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          {/* Hero Section */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                2025 대선 공약 비교
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-2 sm:mt-4">
                후보자들의 공약을 카테고리별로 비교하고 나에게 맞는 후보를
                찾아보세요.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-8">
                <Button
                  className="text-sm sm:text-base w-full sm:w-auto"
                  asChild
                >
                  <Link to="/pledges">공약 확인하기</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Animation Section */}
          <div className="flex-1 flex justify-center w-full md:w-auto">
            <VotingAnimation />
          </div>
        </div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-12 sm:mt-16 md:mt-24"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">
            주요 기능
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <FeatureCard
              title="공약 비교"
              description="각 후보자들의 공약을 카테고리별로 비교해볼 수 있습니다."
              icon="📊"
              link="/pledges"
            />
            <FeatureCard
              title="후보자 정보"
              description="후보자의 상세 정보와 소셜 미디어를 확인할 수 있습니다."
              icon="👤"
              link="/pledges"
            />
            <FeatureCard
              title="투표 준비"
              description="선거일과 투표 방법에 대한 정보를 확인할 수 있습니다."
              icon="🗳️"
              link="/voting-info"
            />
          </div>
        </motion.section>

        {/* 후보자 슬라이드 섹션 */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-12 sm:mt-16 md:mt-24 mb-8 sm:mb-12 md:mb-16"
        >
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              주요 후보자
            </h2>
            <Link
              to="/candidates"
              className="text-sm sm:text-base text-primary hover:underline"
            >
              모든 후보 보기 →
            </Link>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-8">
            공정한 정보 제공을 위해 후보자는 무작위 순서로 표시됩니다.
          </p>

          {/* 후보자 슬라이드 */}
          <div className="relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-white to-transparent z-10"></div>

            <div className="flex animate-scroll">
              {/* 무한 스크롤을 위해 후보자 목록을 두 번 렌더링 */}
              {[...shuffledCandidates, ...shuffledCandidates].map(
                (candidate, index) => (
                  <Link
                    to={`/candidates/${candidate.id}`}
                    key={`${candidate.id}-${index}`}
                    className="flex-shrink-0 w-36 sm:w-48 md:w-64 mx-2 sm:mx-3 md:mx-4 first:ml-0 last:mr-0"
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 h-full"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-2 sm:mb-3 md:mb-4 border-2"
                          style={{ borderColor: candidate.color }}
                        >
                          <img
                            src={candidate.image}
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1">
                          {candidate.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                          {candidate.party}
                        </p>
                        <span
                          className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs"
                          style={{
                            backgroundColor: candidate.color,
                            color: "white",
                          }}
                        >
                          정책 보기
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                )
              )}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  link,
}) => {
  return (
    <Link to={link}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-all h-full flex flex-col border border-gray-100"
      >
        <span className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
          {icon}
        </span>
        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </motion.div>
    </Link>
  );
};

export default HomePage;
