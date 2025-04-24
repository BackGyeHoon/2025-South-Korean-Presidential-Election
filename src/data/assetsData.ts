import { CandidateAsset } from "../types/assets";
import candidatesData from "./candidates.json";

// 문자열 또는 숫자를 반드시 숫자로 변환하는 함수
const ensureNumber = (value: string | number | undefined): number => {
  if (typeof value === "number") return value;
  if (!value || value === "정보 없음") return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

// 후보자 데이터에서 자산 정보만 추출하여 가공
const assetsData: CandidateAsset[] = candidatesData
  .filter((candidate) => candidate.assets) // assets 정보가 있는 후보만 필터링
  .map((candidate) => {
    // 자산 총액 정보 추출 (없으면 0으로 변환)
    const totalAssets = ensureNumber(candidate.assets?.totalAssets);

    // 주요 자산 정보 가공
    let mainAssets = candidate.assets?.mainAssets || "";
    if (!mainAssets && candidate.assets?.housing) {
      // 주요 자산 정보가 없을 경우, 주택 정보가 있으면 그것을 활용
      const housing = candidate.assets.housing;
      mainAssets = housing.location
        ? `${housing.location} ${housing.name || ""} ${housing.type || ""}`
        : "상세 내역 미공개";
    }

    return {
      id: candidate.id,
      name: candidate.name,
      party: candidate.party,
      totalAssets: totalAssets,
      mainAssets: mainAssets,
      source: candidate.assets?.source || "정보 없음",
      color: candidate.color,
    };
  });

export default assetsData;
