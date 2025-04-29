import candidatesData from "./candidates.json";

// 후보자 데이터 타입 정의
export type Pledge = {
  id: string;
  title: string;
  description: string;
  details: string;
  isComplete: boolean;
};

export type Category = {
  id: string;
  title: string;
  pledges: Pledge[];
};

export type SNS = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  x?: string;
  youtube?: string;
};

export type CandidateDetails = {
  english_name: string;
  age: number;
  education: string;
  career: string[];
  achievements: string[];
  sns: SNS;
};

export type AdditionalPolicies = {
  [category: string]: string[];
};

export type Candidate = {
  id: string;
  name: string;
  party: string;
  image: string;
  color: string;
  description: string;
  categories: Category[];
  additional_policies?: AdditionalPolicies;
  details?: CandidateDetails;
  isActive?: boolean; // 후보자의 활동 상태 (경선 탈락 여부)
};

// JSON 파일에서 불러온 데이터 타입 캐스팅
const allCandidates = candidatesData as unknown as Candidate[];

// isActive가 false가 아닌 후보자만 필터링하여 내보냄
// isActive 속성이 없는 경우(기존 데이터)에는 기본적으로 활동 중인 것으로 간주
export const CANDIDATES = allCandidates.filter(
  (candidate) => candidate.isActive !== false
);
