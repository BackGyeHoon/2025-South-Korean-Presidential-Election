import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
  text-align: center;
`;

const ContentCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const CandidatePage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();

  return (
    <>
      <Helmet>
        <title>후보자 정보 | 2025 대선</title>
      </Helmet>
      <PageContainer>
        <PageTitle>후보자 정보</PageTitle>
        <ContentCard>
          <p className="text-lg">후보자 ID: {candidateId || "전체 후보"}</p>
          <p className="mt-4">이 페이지는 현재 개발 중입니다.</p>
        </ContentCard>
      </PageContainer>
    </>
  );
};

export default CandidatePage;
