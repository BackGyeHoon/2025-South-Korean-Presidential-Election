import candidatesData from "./candidates.json";

// candidates.json에서 이미지 정보 추출
const candidateImages: Record<string, string> = candidatesData.reduce(
  (images, candidate) => {
    if (candidate.id && candidate.image) {
      images[candidate.id] = candidate.image;
    }
    return images;
  },
  {} as Record<string, string>
);

export default candidateImages;
