// 자산 가격 추정 참고 사항
export const ASSET_PRICE_NOTE =
  "※ 자산 추정 가격은 KB부동산 시세 및 국토교통부 실거래가 공개시스템의 최근 거래가격 또는 평균 매물가를 기준으로 합니다.";

// 재산 관련 공통 타입 정의
export interface CandidateAsset {
  id: string;
  name: string;
  party: string;
  color: string;
  totalAssets: number;
  mainAssets: string;
  source: string;
}

// 차트 데이터 타입
export interface ChartDataType {
  id: string;
  name: string;
  party: string;
  color: string;
  totalAssets: number;
}

export interface AssetDataType {
  assets: CandidateAsset[];
}

export interface CandidateDetail {
  id: string;
  name: string;
  party: string;
  birthDate: string;
  careerHighlights: string[];
  educationBackground: string[];
  electionPromises: string[];
}

export interface AssetDetailsCardProps {
  asset: CandidateAsset;
  onClose: () => void;
}
