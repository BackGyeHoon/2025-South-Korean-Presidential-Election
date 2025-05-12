import { useEffect, useState } from "react";
import { Button } from "./button";

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnnouncementModal = ({ isOpen, onClose }: AnnouncementModalProps) => {
  // 모달이 열렸을 때만 애니메이션 적용
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* 모달 */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md bg-white rounded-lg shadow-xl z-50 transition-all duration-300 ${
          isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* 헤더 */}
        <div className="bg-primary text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-bold">안내사항</h2>
        </div>

        {/* 내용 */}
        <div className="px-6 py-5">
          <div className="mb-5 space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">0603</span>은 대한민국 유권자를
              위한 중립적인 선거 정보 플랫폼입니다.
            </p>
            <p className="text-gray-700">
              현재 정식 후보자 등록이 진행 중이며{" "}
              <span className="font-semibold">
                등록을 완료한 후보들의 정보만 업데이트
              </span>
              되고 있습니다.
            </p>
            <p className="text-gray-700">
              모든 후보자의 등록이 완료되면 전체 후보에 대한 공식 정보와 공약을
              추가로 업데이트할 예정입니다.
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Button onClick={onClose} variant="taeguk">
              확인했습니다
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementModal;
