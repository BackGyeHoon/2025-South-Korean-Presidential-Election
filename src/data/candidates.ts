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
};

// JSON 파일에서 불러온 데이터 타입 캐스팅
export const CANDIDATES = candidatesData as unknown as Candidate[];
