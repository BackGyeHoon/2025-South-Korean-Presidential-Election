import React from "react";
import { NewsItem } from "../types/news";
import styled from "styled-components";
import NewsCard from "./NewsCard";

interface NewsListProps {
  news: NewsItem[];
  onCategoryFilter: (category: string) => void;
  onCandidateFilter: (candidate: string) => void;
}

const NewsListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 0;
  font-size: 18px;
  color: #666;
`;

const NewsList: React.FC<NewsListProps> = ({
  news,
  onCategoryFilter,
  onCandidateFilter,
}) => {
  if (news.length === 0) {
    return <EmptyState>검색 결과가 없습니다. 필터를 조정해 보세요.</EmptyState>;
  }

  return (
    <NewsListContainer>
      {news.map((item) => (
        <NewsCard
          key={item.id}
          news={item}
          onCategoryClick={onCategoryFilter}
          onCandidateClick={onCandidateFilter}
        />
      ))}
    </NewsListContainer>
  );
};

export default NewsList;
