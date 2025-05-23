import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CANDIDATES } from "../data/candidates";
import { Helmet } from "react-helmet";

// SNS 아이콘 컴포넌트들
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M8 2H1l8.26 11.015L1.45 22H4.1l6.388-7.349L16 22h7l-8.611-11.478L21.8 2h-2.65l-5.986 6.886L8 2Zm9 18L7 4h2l10 16h-2Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm6.5-.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM12 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.434.168-.747.369-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.006 9.075 4 9.461 4 12c0 2.474.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.474 0 2.878-.007 4.029-.058.782-.037 1.309-.142 1.797-.331.433-.169.748-.37 1.08-.702.337-.337.538-.65.704-1.08.19-.493.296-1.02.332-1.8.052-1.104.058-1.49.058-4.029 0-2.474-.007-2.878-.058-4.029-.037-.782-.142-1.31-.332-1.798a2.911 2.911 0 0 0-.703-1.08 2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.925 4.006 14.539 4 12 4Zm0-2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2Z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
  </svg>
);

// 공유 아이콘 컴포넌트
const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
);

interface SocialLinksProps {
  sns: Record<string, string>;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ sns }) => {
  if (!sns) return null;

  return (
    <div className="flex gap-3 mt-3">
      {sns.facebook && (
        <a
          href={sns.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 transition-colors"
          title="Facebook"
        >
          <FacebookIcon />
        </a>
      )}
      {(sns.x || sns.twitter) && (
        <a
          href={sns.x || sns.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition-colors"
          title="X (Twitter)"
        >
          <XIcon />
        </a>
      )}
      {sns.instagram && (
        <a
          href={sns.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-pink-600 transition-colors"
          title="Instagram"
        >
          <InstagramIcon />
        </a>
      )}
      {sns.youtube && (
        <a
          href={sns.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-red-600 transition-colors"
          title="YouTube"
        >
          <YoutubeIcon />
        </a>
      )}
    </div>
  );
};

// 모달 컴포넌트
interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto relative z-10">
        <div className="text-center">
          <div className="mb-4 bg-green-100 text-green-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </div>
          <p className="text-gray-700 mb-4">{message}</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProfileSectionProps {
  candidate: any;
  details: any;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  candidate,
  details,
}) => {
  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 공유 기능 - 단순히 클립보드에 복사만 실행
  const handleShare = () => {
    const url = window.location.href;
    copyToClipboard(url);
  };

  // 클립보드에 URL 복사
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // alert 대신 모달 표시
        setModalMessage("링크가 클립보드에 복사되었습니다.");
        setModalOpen(true);
      })
      .catch((err) => {
        console.error("클립보드 복사 실패:", err);
        // 오류 시에도 모달로 표시
        setModalMessage("링크 복사에 실패했습니다. 다시 시도해주세요.");
        setModalOpen(true);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="h-3" style={{ backgroundColor: candidate.color }}></div>
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div
            className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8 border-4"
            style={{ borderColor: candidate.color }}
          >
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
              <h1 className="text-3xl md:text-4xl font-bold">
                {candidate.name}
              </h1>
              <div className="flex items-center gap-2">
                <div
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: candidate.color, color: "white" }}
                >
                  {candidate.party}
                </div>
                {/* 공유 버튼 추가 */}
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  title="이 페이지 링크 복사하기"
                >
                  <ShareIcon />
                </button>
              </div>
            </div>

            {/* 단일화 정보 표시 */}
            {candidate.unification &&
              candidate.unification.isUnifiedCandidate && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    <h3 className="font-semibold text-md">후보 단일화 정보</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {candidate.unification.unifiedWith.map(
                      (unified: any, index: number) => (
                        <div
                          key={index}
                          className="inline-flex items-center border-2 px-2 py-1 rounded-full text-sm"
                          style={{ borderColor: candidate.color }}
                        >
                          <span className="mr-1 font-medium">
                            {unified.name}
                          </span>
                          <span className="text-gray-600">
                            ({unified.party})
                          </span>
                        </div>
                      )
                    )}
                    <div className="inline-flex items-center text-sm text-gray-600">
                      <span>
                        {new Date(
                          candidate.unification.unificationDate
                        ).toLocaleDateString("ko-KR")}{" "}
                        단일화
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    {candidate.unification.unificationStatement}
                  </p>
                </div>
              )}

            {details && (
              <div className="mb-4">
                <p className="text-gray-600 mb-1">
                  {details.english_name} | {details.age}세
                </p>
                <p className="text-text-light mb-2">{details.education}</p>
                {/* SNS 링크 */}
                {details.sns && <SocialLinks sns={details.sns} />}
              </div>
            )}

            <p className="text-text-light mb-6">{candidate.description}</p>
            <div className="flex justify-center md:justify-start">
              <Button asChild variant="outline">
                <Link to="/pledges">모든 후보 공약 비교하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 복사 완료 모달 */}
      <Modal
        isOpen={modalOpen}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

interface InfoCardProps {
  title: string;
  items: string[];
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-primary">{title}</h2>
        <ul className="space-y-2 list-disc list-inside">
          {items.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// 전과 기록 카드 컴포넌트
interface CriminalRecordsCardProps {
  records?: Array<{
    date: string;
    charge: string;
    reason: string;
    sentence: string;
  }>;
}

const CriminalRecordsCard: React.FC<CriminalRecordsCardProps> = ({
  records,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-primary">전과 기록</h2>
        {records && records.length > 0 ? (
          <div className="space-y-4">
            {records.map((record, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center mb-2 gap-2">
                  <span className="px-2 py-1 bg-red-50 text-red-700 rounded-md text-xs font-medium">
                    {record.charge}
                  </span>
                  <span className="text-sm text-gray-500">{record.date}</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">{record.reason}</p>
                <p className="text-sm font-medium">선고: {record.sentence}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 italic">전과 기록이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

interface PolicyCardProps {
  category: string;
  candidate: any;
  additionalPolicies: any;
}

const PolicyCard: React.FC<PolicyCardProps> = ({
  category,
  candidate,
  additionalPolicies,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-primary">
          {category} 분야 정책
        </h2>

        {/* 기존 공약 정보 표시 */}
        {candidate.categories.find((cat: any) => cat.title === category) && (
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-2">공약</h3>
            <div className="space-y-3">
              {candidate.categories
                .find((cat: any) => cat.title === category)
                ?.pledges.map((pledge: any) => (
                  <div
                    key={pledge.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium mb-1">{pledge.title}</h4>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          pledge.isComplete ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                    <p className="text-sm text-text-light mb-2">
                      {pledge.description}
                    </p>
                    <p className="text-xs text-text-light">{pledge.details}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 추가 정책 정보 표시 */}
        {additionalPolicies && additionalPolicies[category] && (
          <div>
            <h3 className="font-medium text-lg mb-2">추가 정책</h3>
            <div className="space-y-3">
              {additionalPolicies[category].map(
                (policy: string, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <p className="text-sm">{policy}</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* 카테고리에 공약과 정책이 모두 없는 경우 */}
        {!candidate.categories.find((cat: any) => cat.title === category) &&
          (!additionalPolicies || !additionalPolicies[category]) && (
            <p className="text-text-light italic">
              이 분야의 정책 정보가 없습니다.
            </p>
          )}
      </div>
    </div>
  );
};

const CandidateDetailPage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const [candidate, setCandidate] = useState<any>(null);

  useEffect(() => {
    if (candidateId) {
      const foundCandidate = CANDIDATES.find((c) => c.id === candidateId);
      if (foundCandidate) {
        setCandidate(foundCandidate);
      }
    }
  }, [candidateId]);

  if (!candidate) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">후보자를 찾을 수 없습니다</h1>
        <p className="mb-8">요청하신 후보자 정보를 찾을 수 없습니다.</p>
        <Button asChild>
          <Link to="/pledges">공약 페이지로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  // 모든 정책 카테고리 합치기 (기존 공약 카테고리 + 추가 정책 카테고리)
  const allCategories = [
    ...new Set([
      ...candidate.categories.map((cat: any) => cat.title),
      ...(candidate.additional_policies
        ? Object.keys(candidate.additional_policies)
        : []),
    ]),
  ];

  return (
    <>
      {/* OG 태그 설정 */}
      <Helmet>
        <meta
          property="og:title"
          content={`${candidate.name} - ${candidate.party} | 2025 대선 후보`}
        />
        <meta property="og:description" content={candidate.description} />
        <meta property="og:image" content={candidate.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* 후보자 프로필 */}
        <ProfileSection candidate={candidate} details={candidate.details} />

        {/* 후보자 상세 정보 */}
        {candidate.details && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <InfoCard title="주요 경력" items={candidate.details.career} />
            <InfoCard
              title="주요 성과"
              items={candidate.details.achievements}
            />
          </div>
        )}

        {/* 전과 기록 */}
        <div className="mb-8">
          <CriminalRecordsCard records={candidate.criminal_records} />
        </div>

        {/* 주요 정책 및 공약 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allCategories.map((category) => (
            <PolicyCard
              key={category}
              category={category}
              candidate={candidate}
              additionalPolicies={candidate.additional_policies}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CandidateDetailPage;
