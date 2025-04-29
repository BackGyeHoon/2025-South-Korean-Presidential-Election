import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { newsData } from "../data/newsData";
import { NewsItem } from "../types/news";

// 스타일 컴포넌트
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const PageHeader = styled.header`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #eaeaea;
  border-right: none;
  border-radius: 8px 0 0 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

const SearchButton = styled.button`
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2c5282;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterChip = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${(props) => (props.active ? "#3182ce" : "#e2e8f0")};
  background-color: ${(props) => (props.active ? "#ebf8ff" : "white")};
  color: ${(props) => (props.active ? "#3182ce" : "#4a5568")};

  &:hover {
    background-color: ${(props) => (props.active ? "#bee3f8" : "#f7fafc")};
  }
`;

const ClearFilters = styled.button`
  font-size: 0.875rem;
  color: #e53e3e;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const NewsCard = styled(motion.article)`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const NewsImage = styled.div`
  height: 180px;
  background-color: #f7fafc;
  background-size: cover;
  background-position: center;
`;

const NewsContent = styled.div`
  padding: 1.25rem;
`;

const NewsTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsSource = styled.div`
  font-size: 0.8rem;
  color: #718096;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
`;

const NewsSummary = styled.p`
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  color: #4a5568;
  background-color: #edf2f7;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: #718096;
`;

const LoadMoreButton = styled.button`
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 2rem auto;
  padding: 0.75rem 1rem;
  background-color: white;
  border: 1px solid #3182ce;
  color: #3182ce;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #3182ce;
    color: white;
  }
`;

// 모달 스타일 컴포넌트
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #718096;
  transition: color 0.2s;

  &:hover {
    color: #2d3748;
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
`;

const NewsModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const NewsModalContent = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #4a5568;
  white-space: pre-line;
  margin-top: 1.5rem;
`;

const NewsModalMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #718096;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

const OriginalArticleButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #3182ce;
  color: white;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2c5282;
  }
`;

// 뉴스 카드 컴포넌트
const NewsCardItem: React.FC<{
  news: NewsItem;
  onTagClick: (tag: string) => void;
  onClick: () => void;
}> = ({ news, onTagClick, onClick }) => {
  return (
    <NewsCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <NewsImage style={{ backgroundImage: `url(${news.imageUrl})` }} />
      <NewsContent>
        <NewsTitle>{news.title}</NewsTitle>
        <NewsSource>
          <span>{news.source}</span>
          <span>{news.publishedAt}</span>
        </NewsSource>
        <NewsSummary>{news.summary}</NewsSummary>
        <TagsContainer>
          {[...news.categories, ...(news.relatedCandidates || [])].map(
            (tag) => (
              <Tag
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
              >
                {tag}
              </Tag>
            )
          )}
        </TagsContainer>
      </NewsContent>
    </NewsCard>
  );
};

// 뉴스 상세 모달 컴포넌트
const NewsDetailModal: React.FC<{
  news: NewsItem;
  onClose: () => void;
}> = ({ news, onClose }) => {
  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContainer
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>{news.title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalContent>
          <NewsModalImage src={news.imageUrl} alt={news.title} />
          <NewsModalMeta>
            <span>{news.source}</span>
            <span>{news.publishedAt}</span>
          </NewsModalMeta>
          <TagsContainer style={{ marginBottom: "1.5rem" }}>
            {[...news.categories, ...(news.relatedCandidates || [])].map(
              (tag) => (
                <Tag key={tag}>{tag}</Tag>
              )
            )}
          </TagsContainer>
          <NewsSummary style={{ fontWeight: "bold" }}>
            {news.summary}
          </NewsSummary>
          <NewsModalContent>{news.content}</NewsModalContent>
          <OriginalArticleButton
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            원본 기사 보기
          </OriginalArticleButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

const NewsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(newsData);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // 모든 카테고리와 후보자 추출
  const allCategories = Array.from(
    new Set(newsData.flatMap((news) => news.categories))
  ).sort();

  const allCandidates = Array.from(
    new Set(newsData.flatMap((news) => news.relatedCandidates ?? []))
  ).sort();

  // 필터 적용
  useEffect(() => {
    let filtered = [...newsData];

    // 카테고리 필터 적용
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((news) =>
        news.categories.some((category) =>
          selectedCategories.includes(category)
        )
      );
    }

    // 후보자 필터 적용
    if (selectedCandidates.length > 0) {
      filtered = filtered.filter((news) =>
        news.relatedCandidates?.some((candidate) =>
          selectedCandidates.includes(candidate)
        )
      );
    }

    // 검색어 필터 적용
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(query) ||
          news.summary.toLowerCase().includes(query)
      );
    }

    setFilteredNews(filtered);
  }, [selectedCategories, selectedCandidates, searchQuery]);

  // 카테고리 토글
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // 후보자 토글
  const toggleCandidate = (candidate: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidate)
        ? prev.filter((c) => c !== candidate)
        : [...prev, candidate]
    );
  };

  // 필터 초기화
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedCandidates([]);
    setSearchQuery("");
  };

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    if (allCategories.includes(tag)) {
      toggleCategory(tag);
    } else if (allCandidates.includes(tag)) {
      toggleCandidate(tag);
    }
  };

  // 뉴스 카드 클릭 핸들러
  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  return (
    <>
      <Helmet>
        <title>최신 뉴스 | 2025 대선</title>
      </Helmet>
      <PageContainer>
        <PageHeader>
          <PageTitle>최신 뉴스</PageTitle>
          <SubTitle>2025년 대선 관련 최신 뉴스와 정보를 확인하세요</SubTitle>
        </PageHeader>

        {/* 검색 바 */}
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="뉴스 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton>검색</SearchButton>
        </SearchBar>

        {/* 필터 섹션 */}
        <FilterSection>
          <FilterTitle>카테고리</FilterTitle>
          <FilterGroup>
            {allCategories.map((category) => (
              <FilterChip
                key={category}
                active={selectedCategories.includes(category)}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </FilterChip>
            ))}
          </FilterGroup>
        </FilterSection>

        <FilterSection>
          <FilterTitle>후보자</FilterTitle>
          <FilterGroup>
            {allCandidates.map((candidate) => (
              <FilterChip
                key={candidate}
                active={selectedCandidates.includes(candidate)}
                onClick={() => toggleCandidate(candidate)}
              >
                {candidate}
              </FilterChip>
            ))}
          </FilterGroup>
        </FilterSection>

        {/* 필터가 적용된 경우 초기화 버튼 표시 */}
        {(selectedCategories.length > 0 ||
          selectedCandidates.length > 0 ||
          searchQuery) && (
          <ClearFilters onClick={clearFilters}>필터 초기화</ClearFilters>
        )}

        {/* 뉴스 그리드 */}
        <NewsGrid>
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <NewsCardItem
                key={news.id}
                news={news}
                onTagClick={handleTagClick}
                onClick={() => handleNewsClick(news)}
              />
            ))
          ) : (
            <NoResults>검색 결과가 없습니다</NoResults>
          )}
        </NewsGrid>

        {filteredNews.length > 0 && <LoadMoreButton>더 보기</LoadMoreButton>}
      </PageContainer>

      {/* 뉴스 상세 모달 */}
      <AnimatePresence>
        {selectedNews && (
          <NewsDetailModal news={selectedNews} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default NewsPage;
