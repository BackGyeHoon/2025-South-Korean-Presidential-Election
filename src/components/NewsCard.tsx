import React from "react";
import styled from "styled-components";
import { NewsItem } from "../types/news";

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: white;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const NewsImage = styled.div<{ imageUrl: string }>`
  height: 180px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const NewsContent = styled.div`
  padding: 16px;
`;

const NewsTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
`;

const NewsSource = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
`;

const Source = styled.span`
  color: #666;
`;

const PublishedDate = styled.span`
  color: #888;
`;

const NewsSummary = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const CategoryTag = styled(Tag)`
  background-color: #e3f2fd;
  color: #0277bd;
`;

const CandidateTag = styled(Tag)`
  background-color: #e8f5e9;
  color: #2e7d32;
`;

const NewsLink = styled.a`
  display: inline-block;
  margin-top: 16px;
  text-decoration: none;
  color: #0077cc;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

interface NewsCardProps {
  news: NewsItem;
  onCategoryClick: (category: string) => void;
  onCandidateClick: (candidate: string) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  news,
  onCategoryClick,
  onCandidateClick,
}) => {
  return (
    <Card>
      <NewsImage imageUrl={news.imageUrl} />
      <NewsContent>
        <NewsTitle>{news.title}</NewsTitle>
        <NewsSource>
          <Source>{news.source}</Source>
          <PublishedDate>{formatDate(news.publishedAt)}</PublishedDate>
        </NewsSource>
        <NewsSummary>{news.summary}</NewsSummary>
        <TagsContainer>
          {news.categories.map((category) => (
            <CategoryTag
              key={category}
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </CategoryTag>
          ))}
          {news.relatedCandidates?.map((candidate) => (
            <CandidateTag
              key={candidate}
              onClick={() => onCandidateClick(candidate)}
            >
              {candidate}
            </CandidateTag>
          ))}
        </TagsContainer>
        <NewsLink href={news.url} target="_blank" rel="noopener noreferrer">
          기사 읽기 →
        </NewsLink>
      </NewsContent>
    </Card>
  );
};

export default NewsCard;
